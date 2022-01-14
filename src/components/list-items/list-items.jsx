
const ListItems = ({items}) => {
   if(Object.keys(items).length === 0)
      return (
         <span className="fw-light">Pas d'articles dans la base de donnée</span>
      )

   return (
      <div className="col-4">
         <div className="card">
            <div className="card-body">
               { items.map((item, key) => (
                  <span className="fw-bold" key={ key }>{ item.name }</span>
               ))}
            </div>
         </div>
      </div>
   )
}

export default ListItems