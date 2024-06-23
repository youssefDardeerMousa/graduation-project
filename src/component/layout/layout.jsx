import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbarbuild from '../navbar/navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { useApi } from '../../Context.js'; // Update the path to your useApi hook

export default function Layout({ userData, setuserData }) {
  const navigate = useNavigate();
  const { setCartCount, setWishlistCount } = useApi();
  function logOut(){
    localStorage.removeItem("SecritData");
    setuserData(null);
    // setCartCount(0);
    // setWishlistCount(0);
    navigate("/login");
     
  }
 

  return (
    <>
      <Navbarbuild userData={userData} logOut={logOut} /> {/* Define or pass logOut function if needed */}
      <Outlet />
      <div className=" mt-3">
      <Footer />
      </div>
    </>
  );
}
