import { useEffect, useState } from 'react'
import StockService from '../services/stock-service'

const useStock = () => {
   const [stock, setStock] = useState({})
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      let newStock = {}
      StockService.getStock().then(stock => {      
         stock.forEach((i) => {
            newStock[i.barcode] = i
         })
         console.log(newStock);
         setStock(newStock)
      })
   },[])

   useEffect(() => {
      if(Object.keys(stock).length > 0) {
         setLoading(false)
      }    
   }, [stock])

   return [stock, loading]
}

export default useStock