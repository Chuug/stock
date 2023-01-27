import ReactTimeAgo from "react-time-ago";

const LastSales = ({sales}) => {
   return (
      <div className="card">
         <div className="card-header">Dernières ventes</div>
         <div className="card-body">
            <ul className="list-group">
            { sales.map((sale, index) => (
               <li className="list-group-item " key={ index }>
                  <span className="float-start">
                     <ReactTimeAgo date={sale.timestamp} locale="fr-FR" />   
                  </span>
                  <span className="float-end">{ sale.total } € { (sale.payment === 'Cash') ? <i className="fas fa-coins fa-fw mx-1"></i> : <i className="far fa-credit-card fa-fw mx-1"></i>}</span>
               </li>
            ))}
            </ul>
         </div>
      </div>
   )
}

export default LastSales;