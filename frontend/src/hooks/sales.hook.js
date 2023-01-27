import { useEffect, useState } from "react"
import StockService from "../services/stock-service"

const useSales = (stock) => {
   const [sales, setSales] = useState([])

   useEffect(() => {
      updateSales()
   },[])

   useEffect(() => {
      updateSales()
   }, [stock])

   const updateSales = () => {
      StockService.getSales('timestamp','desc').then(rep => setSales(rep))
   }

   return sales
}

export default useSales