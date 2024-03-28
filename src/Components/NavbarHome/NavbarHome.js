/*import { useState, React } from "react";
import { Drawer } from "@mui/material";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./NavbarHome.scss";
import meclogo from "../../assets/meclogo.png";
import { FaHome } from "react-icons/fa";

function NavbarHome() {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="navbar_1">
      <div className="nav__desktop">
        <Link to="/" className="nav_item">
          <div className="logo">
            <div className="home_logo">
              <FaHome color="white" size={25} />
            </div>
            <div className="title">IEDC MEC COLLAB</div>
          </div>
        </Link>
        <div className="navbar_items">
          <Link to="/projects" className="nav_item">
            Projects
          </Link>
          <Link to="/developers" className="nav_item">
            Developers
          </Link>
          {/*<Link to="/ideas" className="nav_item">
            Ideas
          </Link>*/}
          {/* <Link to="/jobs" className="nav_item">
            Jobs
          </Link> /}
        </div>
        <a href="https://www.mec.ac.in/" target="_blank" rel="noreferrer">
          <img src={meclogo} alt="" className="meclogo" />
        </a>
      </div>

      <div className="nav__mob">
        <div className="nav__mob_container">
          <div className="title">IEDC MEC COLLAB</div>
          <button className="nav_btn" onClick={handleDrawerOpen}>
            <HiOutlineMenuAlt3 className="hamburger" />
          </button>
        </div>
      </div>
      <Drawer
        open={open}
        onClick={handleDrawerClose}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleDrawerClose();
          } else if (reason !== "escapeKeyDown") {
            handleDrawerClose();
          }
        }}
        anchor="left"
      >
        <div className="nav__drawer">
          <div className="nav__drawer_header">
            <div
              className="title_mob"
              data-aos="fade-right"
              data-aos-duration="600"
            >
              IEDC MEC COLLAB
            </div>
            <div
              className="navbar_items_mob"
              data-aos="fade-right"
              data-aos-duration="600"
            >
              <Link
                to="/projects"
                className="nav_item_mob"
                spy={true}
                smooth={true}
                onClick={handleDrawerClose}
              >
                Projects
              </Link>
              <Link
                to="/developers"
                className="nav_item_mob"
                spy={true}
                smooth={true}
                onClick={handleDrawerClose}
              >
                Developers
              </Link>
              <Link
                to="/ideas"
                className="nav_item_mob"
                onClick={handleDrawerClose}
              >
                Ideas
              </Link>
              {/* <Link
                to="/jobs"
                className="nav_item_mob"
                onClick={handleDrawerClose}
              >
                Jobs
              </Link> *}
            </div>
          </div>
          <a href="https://www.mec.ac.in/" target="_blank" rel="noreferrer">
            <img src={meclogo} alt="" className="meclogo__mob" />
          </a>
        </div>
      </Drawer>
    </div>
  );
}

export default NavbarHome;*/



import React, { useState, useEffect, useContext } from "react";
import { Drawer } from "@mui/material";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./NavbarHome.scss";
import meclogo from "../../assets/meclogo.png";
import { FaHome } from "react-icons/fa";
import { signIn, signOut } from "../../Firebase/firebase";
import { ProjectContext } from "../../contexts/ProjectContext";
import useNavbar from "../../hooks/useNavbar";

function NavbarHome() {
  const [open, setOpen] = useState(false);
  const { profile } = useContext(ProjectContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [scroll] = useNavbar();

  useEffect(() => {
    setIsLoggedIn(profile && profile.id !== undefined);
  }, [profile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={scroll ? "navbar_1 scrolled" :"navbar_1"}>
      <div className="nav__desktop">
        <Link to="/" className="nav_logo">
          <div className="logo">
            <div className="home_logo">
              <FaHome color="white" size={20} />
            </div>
            <div className="title">IEDC MEC COLLAB</div>
          </div>
        </Link>
        <div className="navbar_items">
          <Link to="/projects" className="nav_item">
            Projects
          </Link>
          <Link to="/ideas" className="nav_item">
            Ideas
          </Link>
          <Link to="/developers" className="nav_item">
            Developers
          </Link>
          {/* Conditional rendering based on login status */}
          {/* {isLoggedIn ? (
             <Link to="/profile" className="nav_item">
             My Profile
           </Link>
          ) : (
            <div className="nav_item" onClick={signIn}>
              Sign In
            </div>
          )} */}
        </div>
        <a href="https://www.mec.ac.in/" target="_blank" rel="noreferrer">
          <img src={meclogo} alt="" className="meclogo" />
        </a>
      </div>

      <div className="nav__mob">
        <div className="nav__mob_container">
          <div className="title">IEDC MEC COLLAB</div>
          <button className="nav_btn" onClick={handleDrawerOpen}>
            <HiOutlineMenuAlt3 className="hamburger" />
          </button>
        </div>
      </div>
      <Drawer
        open={open}
        onClick={handleDrawerClose}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleDrawerClose();
          } else if (reason !== "escapeKeyDown") {
            handleDrawerClose();
          }
        }}
        anchor="left"
      >
        <div className="nav__drawer">
          <div className="nav__drawer_header">
            <div className="title_mob">IEDC MEC COLLAB</div>
            <div className="navbar_items_mob">
              <Link
                to="/projects"
                className="nav_item_mob"
                onClick={handleDrawerClose}
              >
                Projects
              </Link>
              <Link
                to="/ideas"
                className="nav_item_mob"
                onClick={handleDrawerClose}
              >
                Ideas
              </Link>
              <Link
                to="/developers"
                className="nav_item_mob"
                onClick={handleDrawerClose}
              >
                Developers
              </Link>
              {/* Conditional rendering based on login status */}
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="nav_item login"
                  onClick={handleDrawerClose}
                >
                  My Profile
                </Link>
              ) : (
                <button
                  className="nav_item login"
                  onClick={() => {
                    handleDrawerClose();
                    signIn();
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
          <a href="https://www.mec.ac.in/" target="_blank" rel="noreferrer">
            <img src={meclogo} alt="" className="meclogo__mob" />
          </a>
        </div>
      </Drawer>
    </div>
  );
}

export default NavbarHome;
