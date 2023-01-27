import { useState, useEffect } from "react"
import useKeyboard from '../../../hooks/keyboard.hook'
import Calculator from '../../common/Calculator'
import Title from '../../common/Title'
import CardItem from "./order/CardItem"
import ListOrder from './order/ListOrder'
import FinalizeButton from "./order/FinalizeButton"
import OrderPayment from "./order/OrderPayment"
import StockService from "../../../services/stock-service"
import { setFloat } from "../../../helpers/functions"
import { toast } from 'react-toastify';
import LastSales from "./order/LastSales"

const Order = ({memStock, stockBarcode, setStockBarcode, stock, setStock, sales}) => {

   const [order, setOrder] = useState([])
   const [total, setTotal] = useState(0)
   const [target, setTarget] = useState({})
   const [cashout, setCashout] = useState(false)
   const [payment, setPayment] = useState(0)
   const [cashback, setCashback] = useState(0)
   const [finalize, setFinalize] = useState(false)
   const input = useKeyboard()

   const resetOrder = () => {
      setOrder([])
      setTarget({})
      setTotal(0)
      setCashout(false)
      setPayment(0)
      setCashback(0)
      setFinalize(false)
   }

   // Click from ListStock
   useEffect(() => {
      if(stockBarcode) {
         let item = getItem(stockBarcode)
         item ? editItem(item, 'update', (item.quantity + 1)) : editItem(memStock[stockBarcode], 'new')
         setTarget(memStock[stockBarcode])
         setStockBarcode(null)
      }
   }, [stockBarcode])

   // Update Total
   useEffect(() => {
      let newTotal = 0
      order.forEach((item) => {
         newTotal += item.price * item.quantity
      })
      setTotal(setFloat(newTotal))


   },[order])

   // Handle keyboard input
   useEffect(() => {
      if(input) {
         switch(input.type) {
            case 'Scan':
               handleScan(input.input)
               break
            case 'Delete':
               handleDelete(null, target)
               break
            case 'ArrowUp':
               switchItem(input.type)
               break
            case 'ArrowDown':
               switchItem(input.type)
               break
            case 'Enter':
               handleCashout()
               break
            default:
               break
         }
      }      
   },[input])

   // Hello target
   useEffect(() => {
      if(Object.keys(target).length > 0) {
         setCashout(false)
      }
   },[target])

   // Barcode scanner handling
   const handleScan = (barcode) => {
      let item = getItem(barcode)
      if(item) { // increment item quantity
         editItem(item, 'update', (item.quantity + 1))
         setTarget(item)
      } else { // new item
         item = memStock[barcode]
         if(item) {
            editItem(item, 'new')
            setTarget(item)
         } else {
            toast.error("Aucun article trouvé")
         }
      }
   }

   // Get item in order
   const getItem = (barcode) => {
      let item = order.filter(i => i.barcode === barcode)[0]
      return item
   }

   // Edit item in order
   const editItem = (item, action, quantity = null) => {
      let newOrder = {}
      if(action === 'delete') {
         newOrder = order.filter(i => i.barcode !== item.barcode)
         let pos = getItemPosition(item.barcode)
         setOrder(newOrder)
         setTarget((newOrder.length > 0) ? ((pos > 0) ? newOrder[pos - 1] : newOrder[0]) : {})
      } else if (action === 'new') {
         item.quantity = 1
         setOrder([...order, item])
      } else if (action === 'update') {
         item.quantity = quantity
         newOrder = order.filter(i => { return (item.barcode === i.barcode) ? item : i})
         setOrder(newOrder)
      }
   }

   // Switch target position up & down
   const switchItem = (direction) => {
      let pos = getItemPosition(target.barcode)
      if(direction === 'ArrowDown' && pos < order.length - 1) {
         setTarget(order[pos + 1])
      }
      if(direction === 'ArrowUp' && pos > 0) {
         setTarget(order[pos - 1])         
      }
   }

   // Get item position in order
   const getItemPosition = (barcode) => {
      let pos
      order.forEach((item,index) => {
         if(item.barcode === barcode)
            pos = index
      })   
      return pos 
   }

   // Delete item in order
   const handleDelete = (e, item) => {
      if(e)
         e.stopPropagation()
      editItem(item, 'delete')
   }

   // Handle digits from calculator
   const handleCalculator = (quantity) => {
      if(!cashout)
         editItem(target, 'update', quantity)
   }

   const handleCashout = () => {
      if(!cashout) {
         setCashout(true)
         setTarget({})
      } else if(finalize || payment === 0) {
         console.log('On peut finir'); 
         finalizeOrder()  
      }

   }

   const finalizeOrder = () => {
      let sale = {
         total: total,
         payment: payment === 0 ? "Bancontact" : "Cash",
         amount: payment === 0 ? total : total + cashback,
         timestamp: Date.now()
      }

      let newStock = []
      stock.forEach(item => {
         let newItem = item
         order.forEach(orderItem => {
            if(orderItem.barcode === item.barcode) {
               let qt = orderItem.quantity
               newItem.stock -= qt
               StockService.updateItemStock(newItem)               
            }       
         }) 

         newStock.push(newItem)  
      })

      setStock(newStock)
      StockService.addSale(sale)
      resetOrder()
      toast.success('Vente terminée', {
         position: "top-center"
      })
   }

   useEffect(() => {
      if(cashback >= 0 && cashout)
         setFinalize(true)
   },[cashback])

   return (
      <div className="col-6">
         <div className="row">
            <div className="col-8">
               <div className="row">
                  { order.length === 0 &&
                     <div className="card">
                        <div className="card-body px-0">
                           <Title>Scanner un article </Title>
                           <Title><i className="fas fa-5x fa-barcode"></i></Title>
                           <Title>Ou sélectionner dans le stock</Title>
                        </div>
                     </div>                 
                  }
                  { order.length > 0 &&
                     <div className="card">
                        <div className="card-body px-0">
                           { order.length > 0 && 
                              <ListOrder order={ order } total={ total } handleDelete={ handleDelete } target={ target } setTarget={ setTarget }/> 
                           }
                           { (order.length > 0 && cashout) &&
                              <OrderPayment total={ total } cashback={ cashback } setCashback={ setCashback } payment={ payment } setPayment={ setPayment } />
                           }
                           { order.length > 0 &&
                              <FinalizeButton cashout={ cashout } handleCashout={ handleCashout } />                  
                           }
                        </div>
                     </div>
                  }
               </div>
            </div>
            <div className="col-4">
               <CardItem item={ target } />
               <Calculator target={ target } handleCalculator={ handleCalculator } input={ input } />
               { order.length == 0 && 
                  <LastSales sales={ sales } />
               }
               
            </div>
         </div>
      </div>
   )
}

export default Order