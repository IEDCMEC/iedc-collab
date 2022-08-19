import React, { Component } from "react";
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
                                <a className={item.cname} href={item.url}>
                                    {item.label}
                                </a>
                            </li>
                        )
                    })}
                    
                </ul>
            </nav>
        )
    }
}

export default Nav