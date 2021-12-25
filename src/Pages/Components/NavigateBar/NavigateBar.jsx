import React, { useContext, useEffect, useState } from "react";
import NewProjectModal from "../NewProjectModal/NewProjectModal";
import "./cards.css";
import { signOut } from "../../../Firebase/firebase";
import { AuthContext } from "../../../Firebase/Auth/Auth";
import { ProjectContext } from "../../../contexts/ProjectContext";
import SignoutLogo from "../../../assets/Signout-Logo.png";
import { signIn } from "../../../Firebase/firebase";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { handleSearch } = useContext(ProjectContext);

  useEffect(() => {
    if (currentUser) {
      console.log("User logged in");
    } else {
      console.log("User not logged in");
    }
  }, [currentUser]);

  const newprojectClick = async () => {
    if (currentUser) {
      setShowProjectModal(true);
    } else {
      signIn(() => setShowProjectModal(true));
    }
  };

  return (
    <div className="Navigate p-2 mb-5 pb-2">
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-light NavigateBar-mainNav"
        style={{ justifyContent: "space-between", backgroundColor: "white" }}
      >
        <div style={{ cursor: "pointer" }}>
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center" }}
            className="Navbar-homebtn"
          >
            <div
              style={{ display: "flex" }}
              className="NavigateBar-homeicondiv"
            >
              <i
                className="fa fa-home NavigateBar-homeicon"
                style={{ color: "white" }}
              ></i>
            </div>
            <p
              style={{
                marginTop: "0",
                marginBottom: "0",
                fontWeight: "700",
              }}
              className=" NavigateBar-title"
            >
              IEDC MEC COLLAB
            </p>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className="NavigateBar-searchbox mt-2"
        >
          <input
            placeholder="Search projects..."
            onChange={(e) => handleSearch(e.target.value)}
            style={{ borderStyle: "none", outline: "none", width: "95%" }}
          ></input>
          <i
            className="fa fa-search fa-lg Navigate-searchicon"
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <div
          id="navbarSupportedContent"
          style={{ flexGrow: "0", display: "flex" }}
        >
          <div
            className="NavigateBar-Newprobtn css-button"
            onClick={newprojectClick}
          >
            <span className="css-button-icon">
              <i className="fa fa-plus-square"></i>
            </span>
            <span className="css-button-text">New Project</span>
          </div>

          {currentUser && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                signOut();
              }}
            >
              <img
                src={SignoutLogo}
                alt="Sign-Out btn img"
                className="NavigateBar-SignoutLogo"
              ></img>
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
          )}
        </div>
      </nav>
      <NewProjectModal
        show={showProjectModal}
        onHide={() => setShowProjectModal(false)}
      />
    </div>
  );
};

export default Navbar;
