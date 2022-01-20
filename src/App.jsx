import React, { Fragment, useState, useEffect } from 'react';
import useStock from './hooks/stock.hook';
import ListStock from './components/stock/ListStock';
import Loader from './components/Loader';
import Order from './components/Order';
import TopBar from './components/common/TopBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSales from './hooks/sales.hook';

import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr'
TimeAgo.addLocale(fr)



const App = () => {
   const [stock, memStock, loading, setStock] = useStock()
   const sales = useSales(stock)

   const [stockBarcode, setStockBarcode] = useState()

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
         <ToastContainer />
         <TopBar />
         <div className="row animate__animated animate__fadeIn animate__faster mt-5">
            <Order memStock={ memStock } stockBarcode={ stockBarcode } setStockBarcode={ setStockBarcode } stock={ stock } setStock={ setStock } sales={ sales } />
            <ListStock stock={ stock } itemFromStock={ itemFromStock } />
         </div>
      </Fragment>
   )
}

export default App