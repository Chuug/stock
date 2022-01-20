
const TopBar = () => {
   return (
      <div className="fixed-top bg-dark p-2">
         <div className="row">
            <div className="col-6">
               <div className="row">
                  <div className="col-3 my-auto">
                     <h3 className="text-light fw-light">Commande</h3>
                  </div>
                  <div className="col my-auto">
                     <button className="btn btn-light btn-sm mx-1">Commande</button>
                     <button className="btn btn-outline-light btn-sm mx-1">Historique</button>
                  </div>
               </div>
            </div>
            <div className="col-6 p-0">
               <div className="row">
                  <div className="col-3 my-auto">
                     <h3 className="text-light fw-light">Stock</h3>
                  </div>
                  <div className="col my-auto">
                     <button className="btn btn-light btn-sm mx-1">Liste</button>
                     <button className="btn btn-outline-light btn-sm mx-1">Gestion</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TopBar