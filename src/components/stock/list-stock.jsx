import { useEffect, useState  } from "react";
import { niceFloat } from "../../helpers/functions";
import StockService from "../../services/stock-service";

const ListStock = ({stock, itemFromStock}) => {
   const [search, setSearch] = useState('')
   const [listStock, setListStock] = useState(stock)

   useEffect(() => {
      let newStock = {}
      StockService.searchItems(search).then(stock => {
         stock.forEach((i) => {
            newStock[i.barcode] = i
         })
         setListStock(newStock)         
      })
   }, [search])

   return (
      <div className="col">
         <div className="card">
            <div className="card-header text-center p-2">
               <input type="text" name="search" className="form-control form-control-lg" placeholder="Rechercher dans le stock" value={ search } onChange={ (e) => setSearch(e.target.value) } />
            </div>
            <div className="card-body">
               {
                  Object.keys(listStock).map((barcode, key) => (
                     <div className="card p-0 mb-1 stock-hover" key={ key } onClick={() => itemFromStock(barcode)}>
                        <div className="card-body p-2">
                           <div className="row">
                              <div className="col-6 my-auto">
                                 <div>{ stock[barcode].name }</div>
                              </div>
                              <div className="col-2 my-auto">
                                 <div className="fw-light text-end">{ niceFloat(stock[barcode].price) }</div>
                              </div>
                              <div className="col-2 my-auto">
                                 <div className="fw-light text-end">{ stock[barcode].stock }</div>                                 
                              </div>
                              <div className="col text-end my-auto">
                                 <button className="btn btn-dark btn-sm" onClick={() => itemFromStock(barcode)}>
                                    <i className="fas fa-plus"></i>
                                 </button>
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