import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbarbuild from '../navbar/navbar.jsx'

export default function Layout() {
  
  return (
    <>
    <Navbarbuild/>
    <Outlet/> 
    </>
  )
}
