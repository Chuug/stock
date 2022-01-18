import React, { Fragment, useState } from 'react';
import useStock from './hooks/stock.hook';
import ListStock from './components/stock/list-stock';
import Loader from './components/loader';
import Order from './components/order';
import TopBar from './components/common/TopBar';

const App = () => {
   const [stock, loading] = useStock()
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
         <TopBar />
         <div className="row animate__animated animate__fadeIn animate__faster mt-5">
            <Order stock={ stock } stockBarcode={ stockBarcode } setStockBarcode={ setStockBarcode } />
            <ListStock stock={ stock } itemFromStock={ itemFromStock } />
         </div>
      </Fragment>
   )
}

export default App