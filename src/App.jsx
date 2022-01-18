import React, { Fragment, useState } from 'react';
import useStock from './hooks/stock.hook';
import ListStock from './components/stock/list-stock';
import Loader from './components/loader';
import Order from './components/order';
import useItem from './hooks/item.hook';

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
      <div className="row animate__animated animate__fadeIn animate__faster">
         <Order stock={ stock } stockBarcode={ stockBarcode } />
         <ListStock stock={ stock } itemFromStock={ itemFromStock } />
      </div>
   )
}

export default App