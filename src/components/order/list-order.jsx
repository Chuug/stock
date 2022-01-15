import { Fragment } from "react"
import { niceFloat } from "../../helpers/functions"

const ListOrder = ({order, total, handleDelete, target, setTarget}) => {

   return (
      <Fragment>
         <div className="row mb-2">
            <div className="col-5 text-center fw-bold">Article</div>
            <div className="col-3 text-center fw-bold">Quantité</div>
            <div className="col-3 text-center fw-bold">Prix unité</div>
         </div>
         { order.map((item, key) => (
         <div className={'card mb-2 ' + ((target.barcode === item.barcode) ? 'bg-dark text-light' : '')} key={key} onClick={ () => setTarget(item) }>
            <div className="card-body">
               <div className="row">
                  <div className="col-5 my-auto">{ item.name }</div>
                  <div className="col-3 my-auto text-center">{ item.quantity }</div>
                  <div className="col-3 my-auto text-center font-monospace">{ niceFloat(item.price) }</div>
                  <div className="col-1 my-auto">
                     <i className="fas fa-trash text-danger pointer" onClick={ (e) => handleDelete(e,item) }></i>
                  </div>
               </div>
            </div>
         </div>
         ))}
         <div className="card bg-light mt-3">
            <div className="card-body text-center fs-5">
               <span className="font-monospace">{ niceFloat(total) }</span> €
            </div>
         </div>
      </Fragment>
   )
}

export default ListOrder