import React, { Fragment } from 'react';
import TopBar from './components/common/TopBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr'
import { Outlet } from 'react-router-dom';

import useInput from './hooks/input.hook';

TimeAgo.addLocale(fr)

const App = () => {
   const input = useInput();

   return (
      <Fragment>
         <ToastContainer />
         <TopBar />
         <main className="animate__animated animate__fadeIn animate__faster">
            <Outlet context={ input } />
         </main>
      </Fragment>
   )
}

export default App