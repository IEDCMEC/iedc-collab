import React from 'react'
import './MainLayout.scss'
import Nav from '../Navbar/Navbar'
import NavigateBar from '../NavigateBar/NavigateBar'
const MainLayout = (props) => {
  return (
    <div>
        <NavigateBar route={props.route}/>
        <Nav route={props.route}/>
        <div className='layout__root'>
          {props.children}
        </div>
    </div>
  )
}

export default MainLayout