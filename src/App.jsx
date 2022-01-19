import React, { Fragment, useState, useEffect } from 'react';
import useStock from './hooks/stock.hook';
import ListStock from './components/stock/ListStock';
import Loader from './components/Loader';
import Order from './components/Order';
import TopBar from './components/common/TopBar';
import StockService from './services/stock-service';

const App = () => {
   //const [stock, loading] = useStock()
   const [stockBarcode, setStockBarcode] = useState()

   const [stock, setStock] = useState({})
   const [loading, setLoading] = useState(true)

   const [memStock, setMemStock] = useState({}) 

   useEffect(() => {
      getMemStock()
      StockService.getStock().then(rep => setStock(rep))
   },[])

   const getMemStock = () => {
      let newStock = {}
      StockService.getStock().then(stock => {      
         stock.forEach((i) => {
            newStock[i.barcode] = i
         })
         setMemStock(newStock)
      })
   }

   useEffect(() => {
      if(Object.keys(stock).length > 0) {
         setLoading(false)
      }    
   }, [stock])

   const itemFromStock = (barcodeFromStock) => {
      setStockBarcode(barcodeFromStock)
   }

   if(loading)
      return (
         <Fragment>
            <Loader />
         </Fragment>
      )

   return (
      <Fragment>
         <TopBar />
         <div className="row animate__animated animate__fadeIn animate__faster mt-5">
            <Order memStock={ memStock } stockBarcode={ stockBarcode } setStockBarcode={ setStockBarcode } />
            <ListStock stock={ stock } itemFromStock={ itemFromStock } />
         </div>
      </Fragment>
   )
}

export default App