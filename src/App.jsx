import React, { Fragment, useState } from 'react';
import useStock from './hooks/stock.hook';
import ListStock from './components/stock/list-stock';
import Loader from './components/loader';
import Order from './components/order';
import useItem from './hooks/item.hook';

const App = () => {
   const [stock, loading] = useStock()
   const [testt, setTest] = useState()

   const test = (item) => {
      console.log(item);
      setTest(item)
   }

   if(loading)
      return (
         <Fragment>
            <Loader />
         </Fragment>
      )

   return (
      <div className="row">
         <Order stock={ stock } />
         <ListStock stock={ stock } test={ test } />
      </div>
   )
}

export default App