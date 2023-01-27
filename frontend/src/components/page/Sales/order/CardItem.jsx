
const CardItem = ({item}) => {

   if(Object.keys(item).length === 0)
      return null

   return (
      <div className="col-12 mb-2">
         <div className="card">
            <div className="card-body">
               <div className="fw-bold">ID: { item.barcode }</div>
               <div className="mt-2 h6">{ item.name }</div>
               <div className="fw-light">Prix unité: { item.price } €</div>
               <div className="fw-light">Stock: { item.stock }</div>
            </div>
         </div>
      </div>
   )
}

export default CardItem