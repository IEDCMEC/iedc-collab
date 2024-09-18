import React, { useContext, useEffect, useState } from "react";
import ProjectModal from "../ProjectModal/ProjectModal";
import "./cards.css";
import { signOut, signIn } from "../../Firebase/firebase";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Avatar, Drawer } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import meclogo from "../../assets/meclogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import SignupOptions from "../SignupOptions/SignupOptions";
import OrganizationForm from "../OrganizationForm/OrganizationForm";

const Navbar = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const {
    handleSearch,
    handleSearchDevelopers,
    profile,
    setProfile,
  } = useContext(ProjectContext);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Handle companyOpen state based on profile
    if (profile?.role === "Organization") {
      setCompanyOpen(!(profile?.description && profile?.description !== ""));
    } else {
      setCompanyOpen(false);
    }
  }, [profile]);

  useEffect(() => {
    // Handle openModal state based on profile
    setOpenModal(profile?.role === undefined);
  }, [profile]);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const newprojectClick = async () => {
    if (currentUser) {
      if (profile?.role === "Organization" && profile?.isVerified) {
        setShowProjectModal(true);
      } else {
        alert("Your organization is under verification or not verified.");
      }
    } else {
      alert("Please Login to Continue.");
    }
  };

  const getNavItems = () => {
    switch (location.pathname.split("/")[1]) {
      case "ideas":
        return (
          <div className="NavigateBar-searchbox mt-2">
            <input
              placeholder="Search ideas..."
              onChange={(e) => handleSearch(e.target.value)}
              style={{ borderStyle: "none", outline: "none", width: "95%" }}
            />
            <i className="fa fa-search fa-lg Navigate-searchicon" style={{ cursor: "pointer" }}></i>
          </div>
        );
      case "projects":
        return (
          <div className="NavigateBar-searchbox mt-2">
            <input
              placeholder="Search projects..."
              onChange={(e) => handleSearch(e.target.value)}
              style={{ borderStyle: "none", outline: "none", width: "95%" }}
            />
            <i className="fa fa-search fa-lg Navigate-searchicon" style={{ cursor: "pointer" }}></i>
          </div>
        );
      case "developers":
        return (
          <div className="NavigateBar-searchbox mt-2">
            <input
              placeholder="Search developers..."
              onChange={(e) => handleSearchDevelopers(e.target.value)}
              style={{ borderStyle: "none", outline: "none", width: "95%" }}
            />
            <i className="fa fa-search fa-lg Navigate-searchicon" style={{ cursor: "pointer" }}></i>
          </div>
        );
      case "profile":
        return (
          <div className="NavigateBar-profilebox mt-2">
            <input disabled style={{ borderStyle: "none", outline: "none", backgroundColor: "white" }} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {["ideas", "jobs", "projects", "developers", "profile", "MyJobs"].includes(location.pathname.split("/")[1]) && (
        <div className="Navigate p-2 mb-5 pb-2">
          <nav className="navbar navbar-expand-lg fixed-top navbar-light NavigateBar-mainNav" style={{ justifyContent: "space-between", backgroundColor: "white" }}>
            <div style={{ cursor: "pointer" }}>
              <Link to="/" style={{ display: "flex", alignItems: "center" }} className="Navbar-homebtn">
                <div style={{ display: "flex" }} className="NavigateBar-homeicondiv">
                  <i className="fa fa-home NavigateBar-homeicon" style={{ color: "white" }}></i>
                </div>
                <p style={{ marginTop: "0", marginBottom: "0", fontWeight: "800" }} className="NavigateBar-title">
                  IEDC MEC COLLAB
                </p>
              </Link>
            </div>
            {getNavItems()}
            <div id="navbarSupportedContent" style={{ flexGrow: "0", display: "flex" }}>
              <div className="NavigateBar-Newprobtn-1 css-button" onClick={newprojectClick}>
                <div className="css-button-icon">
                  <i className="fa fa-plus-square"></i>
                </div>
                <div className="css-button-text">
                  {profile?.role === "Organization" ? 'Post Job' : 'New Project'}
                </div>
              </div>

              {currentUser ? (
                <Menu menuButton={<MenuButton><Avatar src={profile?.profilePhoto} sx={{ cursor: "pointer", height: "35px", width: "35px" }} /></MenuButton>} transition>
                  <MenuItem onClick={newprojectClick} className="mobile__only" style={{ color: "#9e0000" }}>
                    Create A Project
                  </MenuItem>
                  <MenuItem onClick={() => history.push(`/profile`)} style={{ color: "#9e0000" }}>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={() => { signOut(); history.push("/"); setProfile(null); }} style={{ color: "#9e0000" }}>
                    Logout
                  </MenuItem>
                </Menu>
              ) : (
                <div className="NavigateBar-Newprobtn css-button" onClick={() => signIn()}>
                  <div className="css-button-text">Sign In To Collab</div>
                </div>
              )}
            </div>
          </nav>
          <ProjectModal show={showProjectModal} onHide={() => setShowProjectModal(false)} />
        </div>
      )}
      {["/", "team"].includes(location.pathname.split("/")[1]) && (
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
              <Link to="/projects" className="nav_item">Projects</Link>
              <Link to="/developers" className="nav_item">Developers</Link>
              <Link to="/ideas" className="nav_item">Ideas</Link>
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
          <Drawer open={openDrawer} onClick={handleDrawerClose} onClose={(event, reason) => { if (reason === "backdropClick" || reason === "escapeKeyDown") handleDrawerClose(); }} anchor="left">
            <div className="nav__drawer">
              <div className="nav__drawer_header">
                <div className="title_mob" data-aos="fade-right" data-aos-duration="600">
                  IEDC MEC COLLAB
                </div>
                <div className="navbar_items_mob" data-aos="fade-right" data-aos-duration="600">
                  <Link to="/projects" className="nav_item_mob" onClick={handleDrawerClose}>Projects</Link>
                  <Link to="/developers" className="nav_item_mob" onClick={handleDrawerClose}>Developers</Link>
                  <Link to="/ideas" className="nav_item_mob" onClick={handleDrawerClose}>Ideas</Link>
                </div>
              </div>
              <a href="https://www.mec.ac.in/" target="_blank" rel="noreferrer">
                <img src={meclogo} alt="" className="meclogo__mob" />
              </a>
            </div>
          </Drawer>
        </div>
      )}
      <SignupOptions openModal={openModal} setOpenModal={setOpenModal} />
      <OrganizationForm openModal={companyOpen} setOpenModal={setCompanyOpen} />
    </>
  );
};

export default Navbar;
