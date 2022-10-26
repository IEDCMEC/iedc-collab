import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { Menu } from "./Menu";
import "./Navbar.css";

function Nav({ route }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <nav className="NavbarItems">
      <ul className="NavMenu">
        {Menu.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                activeClassName={route === item.label ? "NavLinksActive" : ""}
                className="NavLinks"
                to={item.url}
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
        {currentUser ? (
          <NavLink
            activeClassName={route === "My Profile" ? "NavLinksActive" : ""}
            className="NavLinks"
            to="/profile"
          >
            My Profile
          </NavLink>
        ) : (
          " "
        )}
      </ul>
    </nav>
  );
}

export default Nav;
