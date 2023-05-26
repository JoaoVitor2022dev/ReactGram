import "./Navbar.css"; 

// components 
import { NavLink, Link } from "react-router-dom";

// incons
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from "react-icons/bs";

// hook react
import { useState } from "react";
// hook authenticaçao 
import { useAuth } from "../../hooks/useAuth";  
// redux
import { useDispatch, useSelector } from "react-redux"; 
// hook de react router
import { useNavigate } from "react-router-dom";

import { logout, reset } from "../../redux/slices/authSlice";

const Navbar = () => {
 
   const { auth } = useAuth(); 
   const { user } = useSelector((state) => state.auth);

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const handleLogout = () => {
      dispatch(logout())
      dispatch(reset());

      navigate('/login');
   };

  return (
    <nav id="navbar">
        <Link to="/">ReactGram</Link>
        <form id="search-form">
            <BsSearch/>
            <input type="text" placeholder="Pesquisa"/>
        </form>
        <ul id="nav-links">
            {auth ? (
              <>
                <li>
                   <NavLink to="/">
                      <BsHouseDoorFill/>
                  </NavLink>
               </li>
               {user && (
                 <li>
                    <NavLink to={`/users/${user._id}`}>
                         <BsFillCameraFill/>
                    </NavLink>
                 </li> 
               )}
               <li>
                <NavLink to="/profile">
                    <BsFillPersonFill/>
                </NavLink>
               </li>
               <li>
                  <span onClick={handleLogout}>
                     Sair
                  </span>
               </li>
              </>
            ):(
            <>
               <li>
                  <NavLink to="/login">
                      Entrar
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/register">
                      Cadastrar
                  </NavLink>
             </li>
            </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar