import { useCallback, useEffect, useState } from 'react'
import StockService from '../services/stock-service'

const useStock = () => {
   const [stock, setStock] = useState([])
   const [memStock, setMemStock] = useState({}) 
   const [loading, setLoading] = useState(true)

   //Get stock from database
   useEffect(() => {
      StockService.getStock().then(rep => setStock(rep))
   },[])

   useEffect(() => {
      if(Object.keys(stock).length > 0) {
         setLoading(false)
         //Set stock object - easy call
         setMemStock(() => {
            let newStock = {}   
            stock.forEach((i) => {
               newStock[i.barcode] = i
            })
            return newStock      
         })
      }
   }, [stock])

   return [stock, memStock, loading, setStock]
}

export default useStock