import React, { useContext, useEffect, useState } from "react";
import NewProjectModal from "../NewProjectModal/NewProjectModal";
import "./cards.css";
import { signOut } from "../../../Firebase/firebase";
import { AuthContext } from "../../../Firebase/Auth/Auth";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <i className="fa fa-chevron-left"></i> Home
        </a>
        <div className="feature">
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
        </div>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {currentUser && (
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
            )}
            <li className="nav-item ">
              <button
                onClick={() => {
                  signOut();
                }}
                className="av-link"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <NewProjectModal
        show={showNewProjectModal}
        onHide={() => setShowNewProjectModal(false)}
      />
      <Navcontents />
    </div>
  );
};

export default Navbar;
