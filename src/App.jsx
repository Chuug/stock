import React, { useState, useEffect, Fragment } from 'react';
import useStock from './hooks/stock.hook';
import ListStock from './components/stock/list-stock';
import Loader from './components/loader';
import Order from './components/order';

const App = () => {
   const [stock, loading] = useStock()

   if(loading)
      return (
         <Fragment>
            <Loader />
         </Fragment>
      )

   return (
      <div className="row">
         <Order stock={ stock } />
         <ListStock stock={ stock } />
      </div>
   )
}

export default App