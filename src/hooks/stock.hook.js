import React, { useEffect, useState } from 'react'
import StockService from '../services/stock-service'

const useStock = () => {
   const [stock, setStock] = useState()

   useEffect(() => {
      let newStock = {}
      StockService.getStock().then(stock => {
         stock.forEach((i) => {
            Object.defineProperty(newStock, i.barcode, {value: i})
         })
         setStock(newStock)
      })
   },[])

   return stock
}

export default useStock