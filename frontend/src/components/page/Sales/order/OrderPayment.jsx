import { Fragment, useEffect, useState } from "react"
import { niceFloat, setFloat } from "../../../../helpers/functions"

const OrderPayment = ({total, cashback, setCashback, payment, setPayment}) => {
   const [amount, setAmount] = useState('')

   useEffect(() => {
      setCashback(setFloat(amount - total))
   }, [amount])

   return (
      <Fragment>
         <div className="strike my-3">
            <span className="h4 fw-light">Paiement</span>
         </div>
         <div className="row">
            <div className="col-6">
               <div className={`btn d-block ${(payment === 0) ? 'btn-dark' : 'btn-outline-dark'}`} onClick={ () => setPayment(0) }>Bancontact</div>
            </div>
            <div className="col-6">
               <div className={`btn d-block ${(payment === 1) ? 'btn-dark' : 'btn-outline-dark'}`} onClick={ () => setPayment(1) }>Espèces</div>
            </div>
         </div>
         { payment === 1 &&
            <div className="row">
               <div className="col-6 my-auto text-end pt-3">
                  <span className="h5">
                     { !amount && "Indiquer un montant" }
                     { (cashback < 0 && amount) && "Montant insuffisant" }
                     { cashback >= 0 && <span>À rendre : <span className="font-monospace bg-light p-2 shadow-sm border">{ cashback } €</span></span>}
                  </span>
               </div>
               <div className="col-6">
                  <input type="number" className="form-control form-control-lg mt-3" placeholder="Montant en espèce" value={ amount } onChange={ (e) => setAmount(e.target.value) } />
               </div>
            </div>
         }
      </Fragment>
   )
}

export default OrderPayment