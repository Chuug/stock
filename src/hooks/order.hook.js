

const useOrder = () => {
   const [order, setOrder] = useState([])

   const editItem = (item, quantity, newItem = false) => {
      item.quantity = quantity
      let newOrder = order.filter(i => { return (item.barcode === i.barcode) ? item : i})
      if(newItem)
         setOrder([...order, item])
      else
         setOrder(newOrder)
   }

   return order
}