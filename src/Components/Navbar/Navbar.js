import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import "./Navbar.css"

class Nav extends Component{
    render(){
        return(
            <nav className="NavbarItems">
                <ul className="NavMenu">
                    {Menu.map((item, index)=>{
                        return(
                            <li key={index}>
                                <NavLink exact activeClassName="NavLinksActive" className="NavLinks" to={item.url}>{item.label}</NavLink>
                            </li>
                        )
                    })}
                    
                </ul>
            </nav>
        )
    }
}

export default Nav