

import { useEffect } from "react"
import ReactTimeAgo from "react-time-ago"

const LastSales = ({sales, lastSalesStyle}) => {
   useEffect(() => {
      console.log(lastSalesStyle);
   }, [lastSalesStyle])
   return (
      <div className="card">
         <div className="card-header">Dernières ventes</div>
         <div className="card-body" id="lastSalesStyle" style={ lastSalesStyle }>
            <ul className="list-group">
            { sales.map((sale, index) => (
               <li className="list-group-item " key={ index }>
                  <span className="float-start">
                     <ReactTimeAgo date={sale.timestamp} locale="fr-FR" />   
                  </span>
                  <span className="float-end">{ (sale.payment === 'Cash') ? <i className="fas fa-coins fa-fw mx-1"></i> : <i className="far fa-credit-card fa-fw mx-1"></i>} { sale.total } €</span>
               </li>
            ))}
            </ul>
         </div>
      </div>
   )
}

export default LastSales