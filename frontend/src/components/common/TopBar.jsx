import { useState } from "react";

import TopBarButton from "./misc/TopBarButton";

const TopBar = () => {

   const [pageName, setPageName] = useState('Vente')

   const handleButton = (e) => {
      setPageName(e.target.innerHTML)
   }

   return (
      <div className="fixed-top bg-dark p-2">
         <div className="row">
            <div className="col-6">
               <div className="row">
                  <div className="col-5 my-auto">
                     <h3 className="text-light fw-light">{ pageName }</h3>
                  </div>
                  <div className="col my-auto">
                     <TopBarButton to="/vente" pageName={ pageName } handleButton={ handleButton }>Vente</TopBarButton>
                     <TopBarButton to="/historique" pageName={ pageName } handleButton={ handleButton }>Historique des ventes</TopBarButton>
                     <TopBarButton to="/stock" pageName={ pageName } handleButton={ handleButton }>Stock</TopBarButton>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TopBar