import React, { useContext, useEffect, useState } from "react";
import ProjectModal from "../ProjectModal/ProjectModal";
import "./cards.css";
import { getUser, signOut } from "../../Firebase/firebase";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { ProjectContext } from "../../contexts/ProjectContext";
import { signIn } from "../../Firebase/firebase";
import { Link, useHistory } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";

const Navbar = (props) => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { handleSearch } = useContext(ProjectContext);
const history=useHistory()
  const newprojectClick = async () => {
    if (currentUser) {
      setShowProjectModal(true);
    } else {
      signIn(() => setShowProjectModal(true));
    }
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const getDev = async (id) => {
    if (id) {
      const user = await getUser(id);
      setSelectedUser(await user.val());
    }
  };
  useEffect(() => {
    getDev(currentUser?.uid);
  }, [currentUser?.uid]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              MEC COLLAB
            </p>
          </Link>
        </div>
        {props.route === "Ideas" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="NavigateBar-searchbox mt-2"
          >
            <input
              placeholder="Search ideas..."
              onChange={(e) => handleSearch(e.target.value)}
              style={{ borderStyle: "none", outline: "none", width: "95%" }}
            ></input>
            <i
              className="fa fa-search fa-lg Navigate-searchicon"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        )}
         {props.route === "Projects" && (
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
        )}
         {props.route === "Developers" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="NavigateBar-searchbox mt-2"
          >
            <input
              placeholder="Search developers..."
              onChange={(e) => handleSearch(e.target.value)}
              style={{ borderStyle: "none", outline: "none", width: "95%" }}
            ></input>
            <i
              className="fa fa-search fa-lg Navigate-searchicon"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        )}
        {props.route === "My Profile" && (
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
        )}

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
            <Avatar
              src={selectedUser?.profilePhoto}
              onClick={handleClick}
              sx={{ cursor: "pointer", height: "35px", width: "35px" }}
            />
          )}
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#F4E6E6",
              overflow: "visible",
              // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "#F4E6E6",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <MenuItem
              sx={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#FFCFCF !important",
                fontFamily: "Nunito",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "19px",
                lineHeight: "29px",
                /* identical to box height */

                color: "#9E0000",
              }}
            >
              MY PROFILE
            </MenuItem>
          </Link>
          <MenuItem
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#F4E6E6 !important",
              fontFamily: "Nunito",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "19px",
              lineHeight: "29px",
              /* identical to box height */

              color: "#9E0000",
            }}
            onClick={() => {
              signOut();history.push("/projects");
            }}
          >
            LOGOUT
          </MenuItem>
        </Menu>
      </nav>
      <ProjectModal
        show={showProjectModal}
        onHide={() => setShowProjectModal(false)}
      />
    </div>
  );
};

export default Navbar;
