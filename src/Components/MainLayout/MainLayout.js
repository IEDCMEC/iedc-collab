import React from 'react'
import Navbar from '../Navbar/Navbar'
import NavigateBar from '../NavigateBar/NavigateBar'
const MainLayout = ({children}) => {
  return (
    <div>
        <NavigateBar/>
        <Navbar/>
        <div style={{
          marginTop:"6rem"
        }}>
          {children}
        </div>
    </div>
  )
}

export default MainLayout