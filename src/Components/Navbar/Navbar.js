import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { Menu } from "./Menu";
import "./Navbar.css";

function Nav({ route }) {
  const { currentUser } = useContext(AuthContext);
  const { setProjects, allProjects, setDevelopers, allDevelopers } = useContext(
    ProjectContext
  );
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
                onClick={() => {
                  setProjects(allProjects);
                  setDevelopers(allDevelopers);
                }}
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
            onClick={() => {
              setProjects(allProjects);
              setDevelopers(allDevelopers);
            }}
          >
            My Profile
          </NavLink>
        ) : (
          " "
        )}
        <NavLink
          activeClassName={route === "Ideas" ? "NavLinksActive" : ""}
          className="NavLinks"
          to="/ideas"
          onClick={() => {
            setProjects(allProjects);
            setDevelopers(allDevelopers);
          }}
        >
          Ideas
        </NavLink>
      </ul>
    </nav>
  );
}

export default Nav;
