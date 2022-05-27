import Axios  from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../Pages/Context';

export default function NavBar() {
  const ctx = useContext(myContext);
  
  const logout = () => {
    Axios.get("/logout",{
    withCredentials: true
  }).then((res) => {
    if (res.data === "sucess") {
      window.location.href = "/";
    }
  })
  }

  return (
    <div className="NavContainer">
      {/* { ctx ? (
        <>
        <Link onClick={logout} to="/logout">Logout</Link>
        {ctx.isAdmin ? (<Link to="/admin">Admin</Link>) : null}  
        <Link to="/profile">Profile</Link>
        </>
      ): (
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link> 
        </>
      )} */}
      <Link onClick={logout} to="/">Logout</Link>
        {ctx.isAdmin ? (<Link to="/admin">Admin</Link>) : null}  
        <Link to="/profile">Profile</Link>
      <Link to="/Tasks">Task</Link>

      
      
    </div>
  )
}