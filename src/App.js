import React from 'react';
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

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/Navbar", element: <Navbarbuild /> },
        { path: "/register", element: <Signup /> },
        { path: "/reset-password", element: <Resetpassword /> },
        { path: "/verify-code", element: <Checkcode /> },
        { path: "/change-password", element: <Changepass /> },
        { path: "/contact-us", element: <ContactUs /> },
        { path: "/products", element: <Allproducts /> },
        { path: "/order", element: <Order /> },
        { path: "/product/:id", element: <Productdetails /> },
        { path: "/category/:categoryId/subcategory/:id", element: <Productdetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> }
      ],
    },
  ]);

  return (
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}
