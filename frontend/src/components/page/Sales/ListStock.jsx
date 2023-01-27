import { useEffect, useState  } from "react";
import { niceFloat } from "../../../helpers/functions";
import StockService from "../../../services/stock-service";

const ListStock = ({stock, itemFromStock}) => {
   const [search, setSearch] = useState('')
   const [listStock, setListStock] = useState(stock)

   useEffect(() => {
      setListStock(stock)
   },[stock])

   useEffect(() => {
      StockService.searchItems(search).then(stock => setListStock(stock))
   }, [search])

   return (
      <div className="col p-0">
         <div className="card">
            <div className="card-header text-center p-2">
               <input type="text" name="search" className="form-control form-control-lg" placeholder="Rechercher dans le stock" value={ search } onChange={ (e) => setSearch(e.target.value) } />
            </div>
            <div className="card-body">
               {
                  listStock.map((item, key) => (
                     <div className="card p-0 mb-1 stock-hover" key={ key } onClick={() => itemFromStock(item.barcode)}>
                        <div className="card-body p-1">
                           <div className="row">
                              <div className="col-6 my-auto">
                                 <div>{ item.name }</div>
                              </div>
                              <div className="col-2 my-auto">
                                 <div className="fw-light text-end">{ niceFloat(item.price) }</div>
                              </div>
                              <div className="col-2 my-auto">
                                 <div className="fw-light text-end">{ item.stock }</div>
                              </div>
                           </div>
                        </div>
                     </div>        
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default ListStock