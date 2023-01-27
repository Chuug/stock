import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Sales from './pages/Sales';
import SalesHistory from './pages/SalesHistory';
import Home from './pages/Home';
import Stock from './pages/Stock';

const routes = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={ <App /> }>
               <Route index element={ <Home /> } />
               <Route path="vente" element={ <Sales /> } />
               <Route path="historique" element={ <SalesHistory /> } />
               <Route path="stock" element={ <Stock /> } /> 
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default routes;


