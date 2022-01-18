import { useState, useEffect, Fragment } from "react"
import useKeyboard from '../hooks/keyboard.hook'
import Calculator from './common/Calculator'
import Title from './common/Title'
import CardItem from './order/CardItem'
import ListOrder from './order/ListOrder'
import Payment from "./order/Payment"
import FinalizeButton from "./order/FinalizeButton"

const Order = ({stock, stockBarcode, setStockBarcode}) => {

   const [order, setOrder] = useState([])
   const [total, setTotal] = useState(0)
   const [target, setTarget] = useState({})
   const [cashout, setCashout] = useState(false)
   const input = useKeyboard()

   // Click from ListStock
   useEffect(() => {
      if(stockBarcode) {
         let item = getItem(stockBarcode)
         item ? editItem(item, 'update', (item.quantity + 1)) : editItem(stock[stockBarcode], 'new')
         setTarget(stock[stockBarcode])
         setStockBarcode(null)
      }
   }, [stockBarcode])

   // Update Total
   useEffect(() => {
      let newTotal = 0
      order.forEach((item) => {
         newTotal += item.price * item.quantity
      })
      setTotal(parseFloat(newTotal))
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
         item = stock[barcode]
         if(item) {
            editItem(item, 'new')
            setTarget(item)
         } else {
            console.log("Item not found");
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
      editItem(target, 'update', quantity)
   }

   const handleCashout = () => {
      setCashout(true)
      setTarget({})
   }

   return (
      <div className="col-6">
         <div className="row">
            <div className={ order.length === 0 ? 'col-12' : 'col-8' }>
               <div className="row">
                  <div className="card">
                     <div className="card-body px-0">
                        { order.length === 0 &&
                           <Fragment>
                              <Title>Scanner un article </Title>
                              <Title>ou</Title>
                              <Title>Sélectionner dans le stock</Title>
                           </Fragment>
                        }
                        { order.length > 0 && 
                           <ListOrder order={ order } total={ total } handleDelete={ handleDelete } target={ target } setTarget={ setTarget }/> 
                        }
                        { (order.length > 0 && cashout) &&
                           <Payment />
                        }
                        { order.length > 0 &&
                           <FinalizeButton cashout={ cashout } handleCashout={ handleCashout } />                  
                        }
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-4">
               <CardItem item={ target } />
               <Calculator target={ target } handleCalculator={ handleCalculator } input={ input } />
            </div>
         </div>
      </div>
   )
}

export default Order