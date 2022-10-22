import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import "./Navbar.css";

function Nav ({route}) {
    console.log(route)
    return (
      <nav className="NavbarItems">
        <ul className="NavMenu">
          {Menu.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                activeClassName={(route === item.label) ? "NavLinksActive" : ""}
                  className="NavLinks"
                  to={item.url}
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
}

export default Nav;
