import Order from '../components/page/Sales/Order';
import ListStock from '../components/page/Sales/ListStock';

import useStock from '../hooks/stock.hook';
import Loader from '../components/Loader';
import useSales from '../hooks/sales.hook';

import { Fragment, useState } from 'react';

const Sales = () => {
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
      <div className='row'>
         <Order   memStock={ memStock } 
                  stockBarcode={ stockBarcode } 
                  setStockBarcode={ setStockBarcode } 
                  stock={ stock } 
                  setStock={ setStock } 
                  sales={ sales } />
         <ListStock  stock={ stock } 
                     itemFromStock={ itemFromStock } />
      </div>
   )
}

export default Sales;