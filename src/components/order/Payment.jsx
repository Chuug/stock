import { Fragment } from "react"

const Payment = () => {
   return (
      <Fragment>
         <div className="strike my-3">
            <span className="h4 fw-light">Paiment</span>
         </div>
         <div className="row">
            <div className="col-6">
               <div className="btn btn-dark d-block">Bancontact</div>
            </div>
            <div className="col-6">
               <div className="btn btn-outline-dark d-block">Espèces</div>
            </div>
         </div>
      </Fragment>
   )
}

export default Payment