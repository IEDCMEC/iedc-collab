import React from 'react'
import './MainLayout.scss'
import Nav from '../Navbar/Navbar'
import NavigateBar from '../NavigateBar/NavigateBar'
const MainLayout = ({route}) => {
  return (
    <div>
        <NavigateBar/>
        <Nav route={route}/>
        <div className='layout__root'>
        </div>
    </div>
  )
}

export default MainLayout