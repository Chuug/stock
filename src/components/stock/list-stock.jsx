import { niceFloat } from "../../helpers/functions";

const ListStock = ({stock}) => {
   return (
      <div className="col-4">
         <div className="card">
            <div className="card-header text-center">
               <h5>Stock</h5>
            </div>
            <div className="card-body">
               {
                  Object.keys(stock).map((item, key) => (
                     <div className="card p-0 mb-1" key={ key }>
                        <div className="card-body p-2">
                           <div className="row">
                              <div className="col-6 my-auto">
                                 <div className="fw-bold">{ stock[item].name }</div>
                              </div>
                              <div className="col-2 my-auto">
                                 <div className="fw-light text-end">{ niceFloat(stock[item].price) }</div>
                              </div>
                              <div className="col-2 my-auto">
                                 <div className="fw-light text-end">{ stock[item].stock }</div>                                 
                              </div>
                              <div className="col text-end my-auto">
                                 <button className="btn btn-dark btn-sm">
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