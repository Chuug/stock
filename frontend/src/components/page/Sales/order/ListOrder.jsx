import { Fragment } from "react"
import { niceFloat } from "../../../../helpers/functions"

const ListOrder = ({order, total, handleDelete, target, setTarget}) => {

   return (
      <Fragment>
         <div className="row mb-2">
            <div className="col-6 text-center fw-bold">Article</div>
            <div className="col-2 text-center fw-bold">Quantité</div>
            <div className="col-3 text-center fw-bold">Prix unité</div>
         </div>
         { order.map((item, key) => (
         <div className={'card mb-2 ' + ((target.barcode === item.barcode) ? 'bg-dark text-light' : '')} key={key} onClick={ () => setTarget(item) }>
            <div className="card-body">
               <div className="row">
                  <div className="col-6 my-auto">
                     { item.name }
                     { (target.barcode === item.barcode) && 
                        <span className="float-end"><i className="fas fa-arrows-alt-v"></i></span> 
                     }            
                  </div>
                  <div className="col-2 my-auto text-center">{ item.quantity }</div>
                  <div className="col-3 my-auto text-center font-monospace">{ niceFloat(item.price) }</div>
                  <div className="col-1 my-auto">
                     <i className="fas fa-trash text-danger pointer" onClick={ (e) => handleDelete(e,item) }></i>
                  </div>
               </div>
            </div>
         </div>
         ))}
         <div className="row">
            <div className="col-6 bg-dark text-light text-center p-3 h5 mt-3 shadow-sm">
               Total
            </div>
            <div className="col-6 bg-light text-dark text-center p-3 h5 mt-3 shadow-sm">
               <span className="font-monospace">{ niceFloat(total) } €</span>
            </div>
         </div>
      </Fragment>
   )
}

export default ListOrder