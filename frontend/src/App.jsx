import React, { Fragment, useState, useEffect } from 'react';
import useStock from './hooks/stock.hook';
import ListStock from './components/page/Sales/ListStock';
import Loader from './components/Loader';
import Order from './components/page/Sales/Order';
import TopBar from './components/common/TopBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSales from './hooks/sales.hook';
import SideBar from './components/common/SideBar';

import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr'
import { Outlet } from 'react-router-dom';
TimeAgo.addLocale(fr)



const App = () => {

   return (
      <Fragment>
         <ToastContainer />
         <TopBar />
         <main className="animate__animated animate__fadeIn animate__faster">
            <Outlet />
         </main>
      </Fragment>
   )
}

export default App