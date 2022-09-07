import React from 'react'
import './MainLayout.scss'
import Navbar from '../Navbar/Navbar'
import NavigateBar from '../NavigateBar/NavigateBar'
const MainLayout = ({children}) => {
  return (
    <div>
        <NavigateBar/>
        <Navbar/>
        <div className='layout__root'>
          {children}
        </div>
    </div>
  )
}

export default MainLayout