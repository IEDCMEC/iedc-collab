import React, { useContext, useEffect, useState } from "react";
import NewProjectModal from "../NewProjectModal/NewProjectModal";
import "./cards.css";
import { signOut } from "../../../Firebase/firebase";
import { AuthContext } from "../../../Firebase/Auth/Auth";
import SignoutLogo from "../../../assets/Signout-Logo.png";

const Navbar = () => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNavContents, setShowNavContents] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      console.log("User logged in");
    } else {
      console.log("User not logged in");
    }
  }, [currentUser]);

  const Navcontents = () => {
    if (showNavContents)
      return (
        <div className="dropdown">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 dropdown-content">
            {currentUser && (
              <>
                <li className="nav-item ">
                  <span
                    onClick={() => setShowNewProjectModal(true)}
                    className="av-link"
                  >
                    New Project
                  </span>
                </li>
                &nbsp;&nbsp;
              </>
            )}
            <li className="nav-item ">
              <span
                onClick={() => {
                  signOut();
                }}
                className="av-link"
              >
                Sign Out
              </span>
            </li>
          </ul>
        </div>
      );
    else return <div></div>;
  };
  return (
    <div className="Navigate">
      <nav
        className="navbar navbar-expand-lg navbar-light NavigateBar-mainNav"
        style={{ justifyContent: "space-between", backgroundColor: "white" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <a className="navbar-brand" href="/">
            <div
              style={{ background: "#9E0000", display: "flex" }}
              className="NavigateBar-homeicondiv"
            >
              <i
                class="fa fa-home NavigateBar-homeicon"
                style={{ color: "white" }}
              ></i>
            </div>
          </a>
          <p
            style={{
              color: "#9E0000",
              marginTop: "0",
              marginBottom: "0",
              fontWeight: "700",
            }}
            className="NavigateBar-title"
          >
            IEDC MEC COLLAB
          </p>
        </div>
        <div
          style={{
            border: "2px solid #9E0000",
            display: "flex",
            alignItems: "center",
          }}
          className="NavigateBar-searchbox"
        >
          <input
            placeholder="Search projects..."
            style={{ borderStyle: "none", outline: "none", width: "95%" }}
          ></input>
          <i class="fa fa-search fa-lg" style={{ color: "#9E0000" }}></i>
        </div>
        {/*<div className="feature">
          <button
            onClick={() => setShowNavContents(!showNavContents)}
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>*/}

        {/*{currentUser && (
              <>
                <li className="nav-item ">
                  <button
                    onClick={() => setShowNewProjectModal(true)}
                    className="av-link"
                  >
                    New Project
                  </button>
                </li>
                &nbsp;&nbsp;
              </>
            )}*/}
        

        <div id="navbarSupportedContent" style={{ flexGrow: "0",display:"flex" }} >
          <a className="NavigateBar-Newprobtn css-button"  onClick={() => setShowNewProjectModal(true)}>
            <span class="css-button-icon">
              <i className="fa fa-plus-square"></i>
            </span>
            <span className="css-button-text">New Project</span>
          </a>
       

          <div style={{ display: "flex", alignItems: "center" }} onClick={() => {
                signOut();
              }}>
            <img src={SignoutLogo} className="NavigateBar-SignoutLogo"></img>
            <p
              
              style={{
                color: "rgba(158, 0, 0, 1)",
                fontWeight: "700",
                marginBottom: "0",
              }}
            >
              Sign Out
            </p>
          </div>
        </div>
      </nav>
      <NewProjectModal
        show={showNewProjectModal}
        onHide={() => setShowNewProjectModal(false)}
      />
      {/*<Navcontents />*/}
    </div>
  );
};

export default Navbar;
