import React, { useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import NavBar from './Components/NavBar';
import { Routes, Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Welcome from './Pages/Welcome';
import ForgotPassword from './Pages/ForgotPassword';
import Tasks from './Pages/Tasks';

import "./main.css";
import { myContext } from './Pages/Context';





function App() {
const ctx = useContext(myContext);


  return (
    <div >
      <BrowserRouter>
     
      {ctx ? <NavBar /> : null}
      
      <Routes>
        
      
      <Route path='/welcome' element={<Welcome/>}/>  
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>  
        {
          ctx ? (
            <>
            
            {ctx.isAdmin ? <Route path='/admin' element={<AdminPage/>}/> : null }
            <Route path='/profile'  element={<Profile/>}/>
            <Route path='/Tasks' element={<Tasks/>}/>   
            </>
          ) : (
            <>
            
            <Route path='/login' element={<Login/>}/>
            <Route path='/register'  element={<Register/>}/>
            <Route path='/' element={<Homepage/>}/>  
            </>
            )
          }
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
