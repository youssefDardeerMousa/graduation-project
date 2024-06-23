import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './component/layout/layout.jsx';
import Login from './component/login/login.jsx';
import Signup from './component/signup/signup.jsx';
import Resetpassword from './component/resetpassword/resetpassword.jsx';
import Checkcode from './component/checkcode/checkcode.jsx';
import Changepass from './component/changepassword/changepass.jsx';
import ContactUs from './component/contactus/contactus.jsx';
import Home from './component/home/home.jsx';
import { ApiProvider } from './Context.js';
import Navbarbuild from './component/navbar/navbar.jsx';
import Allproducts from './component/product/allproducts.jsx';
import Productdetails from './component/productdetails/ProductDetails.jsx';
import Cart from './component/cart/cart.jsx';
import Order from './component/order/order.jsx';
import Wishlist from './component/wishlist/wishlist.jsx';
import Aboutus from './component/aboutus/aboutus.jsx';
import Protected from './component/protucted/Protucted.jsx';
import { jwtDecode } from 'jwt-decode';
//Aboutus
 export default function App() {
  let [userData,setuserData]=useState(null)
  function saveUserData(){
    let enCodedToken=localStorage.getItem("SecritData");
    let decodedToken=jwtDecode(enCodedToken);
    setuserData(decodedToken)
}
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout userData={userData} setuserData={setuserData} />,
      children: [
        { index: true, element:<Protected> <Home /></Protected>  },
        { path: "/login", element: <Login /> },
        { path: "/Navbar", element: <Navbarbuild /> },
        { path: "/register", element: <Signup /> },
        { path: "/reset-password", element: <Resetpassword /> },
        { path: "/verify-code", element: <Protected><Checkcode /></Protected>  },
        { path: "/change-password", element: <Changepass /> },
        { path: "/contact-us", element: <Protected><ContactUs /></Protected>  },
        { path: "/products", element: <Allproducts /> },
        { path: "/order", element: <Protected><Order /></Protected>  },
        { path: "/product/:id", element: <Protected><Productdetails /></Protected>  },
        { path: "/category/:categoryId/subcategory/:id", element: <Protected><Productdetails /></Protected>  },
        { path: "/cart", element: <Protected> <Cart /> </Protected>},
        { path: "/wishlist", element: <Protected><Wishlist /></Protected>  },
        { path: "/Aboutus", element: <Protected><Aboutus /> </Protected> }

      ],
    },
  ]);

  return (
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}
