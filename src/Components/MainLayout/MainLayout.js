import React from 'react'
import Navbar from '../Navbar/Navbar'
import NavigateBar from '../NavigateBar/NavigateBar'
const MainLayout = ({children}) => {
  return (
    <div>
        <NavigateBar/>
        <Navbar/>
        <div>{children}</div>
    </div>
  )
}

export default MainLayout