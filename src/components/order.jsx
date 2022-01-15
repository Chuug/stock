import { useState, useEffect, Fragment } from "react"
import useKeyboard from '../hooks/keyboard.hook'
import Calculator from './common/calculator'
import Title from './common/title'
import CardItem from './card-item'
import ListOrder from './order/list-order'

const Order = ({stock}) => {

   const [order, setOrder] = useState([])
   const [total, setTotal] = useState(0)
   const [target, setTarget] = useState({})
   const input = useKeyboard()

   useEffect(() => {
      let newTotal = 0
      order.forEach((item) => {
         newTotal += item.price * item.quantity
      })
      setTotal(parseFloat(newTotal))
   },[order])

   // handle input
   useEffect(() => {
      if(input) {
         switch(input.type) {
            case 'Scan':
               handleScan(input.input)
               break
            case 'Delete':
               removeItem(null, target.barcode)
               break
            case 'ArrowUp':
               switchItem(input.type)
               break
            case 'ArrowDown':
               switchItem(input.type)
               break
            default:
               break
         }
      }      
   },[input])

   useEffect(() => {
      console.log(target);
   },[target])

   const handleScan = (barcode) => {
      let item = order.filter(item => item.barcode === barcode)[0]
      if(item) { // increment item quantity
         // updateItemQuantity(item, (item.quantity + 1))
         // setTarget(item)
         editItem(item, 'update', (item.quantity + 1))
      } else { // new item
         item = stock[barcode]
         if(item) {
            editItem(item, 'new')
            // item.quantity = 1;
            // setOrder([...order, item])  
            // setTarget(item)
         } else {
            console.log("Item not found");
         }
      }
      setTarget(item)
   }

   const editItem = (item, action, quantity = null) => {
      let newOrder = {}
      if(action === 'delete') {
         newOrder = order.filter(i => i.barcode !== item.barcode)
         setOrder(newOrder)
      } else if (action === 'new') {
         item.quantity = 1
         setOrder([...order, item])
      } else if (action === 'update') {
         item.quantity = quantity
         newOrder = order.filter(i => { return (item.barcode === i.barcode) ? item : i})
         setOrder(newOrder)
      }
      // item.quantity = quantity
      // let newOrder = order.filter(i => { return (item.barcode === i.barcode) ? item : i})
      // if(newItem)
      //    setOrder([...order, item])
      // else
      //    setOrder(newOrder)
   }

   const switchItem = (direction) => {
      let pos = getItemPosition(target.barcode)
      if(direction === 'ArrowDown' && pos < order.length - 1) {
         setTarget(order[pos + 1])
      }
      if(direction === 'ArrowUp' && pos > 0) {
         setTarget(order[pos - 1])         
      }
   }

   const getItemPosition = (barcode) => {
      let pos
      order.forEach((item,index) => {
         if(item.barcode === barcode)
            pos = index
      })   
      return pos 
   }

   const updateItemQuantity = (item, quantity) => {
      item.quantity = quantity
      let newOrder = order.filter(i => { return (i.barcode === item.barcode) ? item : i})
      setOrder(newOrder)
   }

   const handleDelete = (e, item) => {
      if(e)
         e.stopPropagation()
      editItem(item, 'delete')
      setTarget((order[0]) ? order[0] : {})
   }

   const removeItem = (e,item) => {
      if(e)
         e.stopPropagation()
      const newOrder = order.filter(i => i.barcode !== item.barcode)
      setOrder(newOrder)
      setTarget((newOrder[0]) ? newOrder[0] : {})
   }

   const handleCalculator = (quantity) => {
      editItem(target, 'update', quantity)
      //updateItemQuantity(target, quantity)
   }

   return (
      <Fragment>
         <div className="col-4">
            <div className="card">
               <div className="card-body">
                  <Title>Commande</Title>
                  { order.length > 0 && <ListOrder order={ order } total={ total } handleDelete={ handleDelete } target={ target } setTarget={ setTarget }/> }
               </div>
            </div>
         </div>
         <Calculator target={ target } handleCalculator={ handleCalculator } input={ input } />
         <CardItem item={ target } />
      </Fragment>
   )
}

export default Order