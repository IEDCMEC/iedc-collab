import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";
import { AuthContext } from "../../Firebase/Auth/Auth";
// import { CompanyMenu, Menu } from "./Menu";
import "./Navbar.css";

function Nav({ route }) {
  const { currentUser } = useContext(AuthContext);
  const {
    setProjects,
    allProjects,
    setDevelopers,
    allDevelopers,
    allJobs,
    setJobs,
    profile,
  } = useContext(ProjectContext);
  const Menu = [
    {
      label: "Projects",
      url: "/projects",
      onClickFunction: (attribute) => setProjects(attribute),
      attribute: allProjects,
    },
    {
      label: "Developers",
      url: "/developers",
      onClickFunction: (attribute) => setDevelopers(attribute),
      attribute: allDevelopers,
    },
    /*{
      label: "Ideas",
      url: "/ideas",
      onClickFunction: () => {},
      attribute: [],
    },*/
    
  ];

  const CompanyMenu = [
    {
      label: "My Jobs",
      url: "/MyJobs",
    },
  ];

  return (
    <nav className="NavbarItems">
      <ul className="NavMenu">
        {profile?.role && profile?.role === "User"
          ? Menu.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    activeClassName={
                      route === item.label ? "NavLinksActive" : ""
                    }
                    className="NavLinks"
                    to={item.url}
                    onClick={() => item.onClickFunction(item.attribute)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })
          : profile?.role && profile?.role === "Organization"
          ? CompanyMenu.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    activeClassName={
                      route === item.label ? "NavLinksActive" : ""
                    }
                    className="NavLinks"
                    to={item.url}
                    // onClick={() => {
                    //   setProjects(allProjects);
                    //   setDevelopers(allDevelopers);
                    // }}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })
          : Menu.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    activeClassName={
                      route === item.label ? "NavLinksActive" : ""
                    }
                    className="NavLinks"
                    to={item.url}
                    // onClick={() => {
                    //   setProjects(allProjects);
                    //   setDevelopers(allDevelopers);
                    // }}
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
        {/* <NavLink
          activeClassName={route === "Jobs" ? "NavLinksActive" : ""}
          className="NavLinks"
          to="/jobs"
          onClick={() => {
            setProjects(allProjects);
            setDevelopers(allDevelopers);
          }}
        >
          Jobs
        </NavLink> */}
      </ul>
    </nav>
  );
}

export default Nav;
