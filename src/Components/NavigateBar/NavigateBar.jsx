import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, Drawer } from '@mui/material';
import { FaHome } from 'react-icons/fa';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

import ProjectModal from '../ProjectModal/ProjectModal';
import './cards.scss';
import { signOut, signIn } from '../../Firebase/firebase';
import { AuthContext } from '../../Firebase/Auth/Auth';
import { ProjectContext } from '../../contexts/ProjectContext';
import meclogo from '../../assets/meclogo.png';

function Navbar() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const {
    handleSearch,
    handleSearchDevelopers,
    profile,
    fetchUserProfile,
  } = useContext(ProjectContext);
  const history = useHistory();
  const [open1, setOpen1] = useState(false);
  const location = useLocation();
  const handleDrawerOpen = () => {
    setOpen1(true);
  };
  const handleDrawerClose = () => {
    setOpen1(false);
  };
  const newprojectClick = async () => {
    if (currentUser) {
      setShowProjectModal(true);
    } else {
      alert('Please Login to Continue.');
    }
  };
  // const [selectedUser, setSelectedUser] = useState(null);
  // const getDev = async (id) => {
  //   if (id) {
  //     const user = await getUser(id);
  //     setSelectedUser(await user.val());
  //   }
  // };
  // useEffect(() => {
  //   getDev(currentUser?.uid);
  // }, [currentUser?.uid]);
  useEffect(() => {
    if (!profile) {
      fetchUserProfile();
    }
  }, [currentUser]);

  return (
    <>
      {(location.pathname.split('/')[1] === 'ideas' ||
        location.pathname.split('/')[1] === 'projects' ||
        location.pathname.split('/')[1] === 'developers' ||
        location.pathname.split('/')[1] === 'profile') && (
        <div className="Navigate p-2 mb-5 pb-2">
          <nav
            className="navbar navbar-expand-lg fixed-top navbar-light NavigateBar-mainNav"
            style={{
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}
          >
            <div style={{ cursor: 'pointer' }}>
              <Link
                to="/"
                style={{ display: 'flex', alignItems: 'center' }}
                className="Navbar-homebtn"
              >
                <div
                  style={{ display: 'flex' }}
                  className="NavigateBar-homeicondiv"
                >
                  <i
                    className="fa fa-home NavigateBar-homeicon"
                    style={{ color: 'white' }}
                  />
                </div>
                <p
                  style={{
                    marginTop: '0',
                    marginBottom: '0',
                    fontWeight: '800',
                  }}
                  className=" NavigateBar-title"
                >
                  IEDC MEC COLLAB
                </p>
              </Link>
            </div>
            {location.pathname.split('/')[1] === 'ideas' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="NavigateBar-searchbox mt-2"
              >
                <input
                  placeholder="Search ideas..."
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ borderStyle: 'none', outline: 'none', width: '95%' }}
                />
                <i
                  className="fa fa-search fa-lg Navigate-searchicon"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            {location.pathname.split('/')[1] === 'projects' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="NavigateBar-searchbox mt-2"
              >
                <input
                  placeholder="Search projects..."
                  onChange={(e) => {
                    e.preventDefault();
                    handleSearch(e.target.value);
                  }}
                  style={{ borderStyle: 'none', outline: 'none', width: '95%' }}
                />
                <i
                  className="fa fa-search fa-lg Navigate-searchicon"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            {location.pathname.split('/')[1] === 'developers' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="NavigateBar-searchbox mt-2"
              >
                <input
                  placeholder="Search developers..."
                  onChange={(e1) => {
                    e1.preventDefault();
                    handleSearchDevelopers(e1.target.value);
                  }}
                  style={{ borderStyle: 'none', outline: 'none', width: '95%' }}
                />
                <i
                  className="fa fa-search fa-lg Navigate-searchicon"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            {location.pathname.split('/')[1] === 'profile' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="NavigateBar-searchbox mt-2"
              >
                <input
                  placeholder="Search projects..."
                  onChange={(e) => {
                    history.push('/projects');
                    handleSearch(e.target.value);
                  }}
                  style={{ borderStyle: 'none', outline: 'none', width: '95%' }}
                />
                <i
                  className="fa fa-search fa-lg Navigate-searchicon"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}

            <div
              id="navbarSupportedContent"
              style={{ flexGrow: '0', display: 'flex' }}
            >
              <button
                type="button"
                className="NavigateBar-Newprobtn-1 css-button"
                onClick={newprojectClick}
              >
                <div className="css-button-icon">
                  <i className="fa fa-plus-square" />
                </div>
                <div className="css-button-text">New Project</div>
              </button>

              {currentUser ? (
                <Menu
                  menuButton={
                    <MenuButton>
                      <Avatar
                        src={profile?.profilePhoto}
                        sx={{
                          cursor: 'pointer',
                          height: '35px',
                          width: '35px',
                        }}
                      />
                    </MenuButton>
                  }
                  transition
                >
                  <MenuItem
                    onClick={newprojectClick}
                    className="mobile__only"
                    style={{
                      color: '#9e0000',
                    }}
                  >
                    Create A Project
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      history.push('/profile');
                    }}
                    style={{
                      color: '#9e0000',
                    }}
                  >
                    {' '}
                    My Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      signOut();
                      history.push('/projects');
                    }}
                    style={{
                      color: '#9e0000',
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              ) : (
                <button
                  type="button"
                  className="NavigateBar-Newprobtn css-button"
                  onClick={signIn}
                >
                  <div className="css-button-text">Sign In To Collab</div>
                </button>
              )}
            </div>
          </nav>
          <ProjectModal
            show={showProjectModal}
            onHide={() => setShowProjectModal(false)}
          />
        </div>
      )}
      {location.pathname === '/' ||
        (location.pathname.split('/')[1] === 'team' && (
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
                <Link to="/ideas" className="nav_item">
                  Ideas
                </Link>
              </div>
              <a href="https://www.mec.ac.in/" target="_blank" rel="noreferrer">
                <img src={meclogo} alt="" className="meclogo" />
              </a>
            </div>

            <div className="nav__mob">
              <div className="nav__mob_container">
                <div className="title">IEDC MEC COLLAB</div>
                <button
                  type="button"
                  className="nav_btn"
                  onClick={handleDrawerOpen}
                >
                  <HiOutlineMenuAlt3 className="hamburger" />
                </button>
              </div>
            </div>
            <Drawer
              open={open1}
              onClick={handleDrawerClose}
              onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                  handleDrawerClose();
                } else if (reason !== 'escapeKeyDown') {
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
                      spy
                      smooth
                      onClick={handleDrawerClose}
                    >
                      Projects
                    </Link>
                    <Link
                      to="/developers"
                      className="nav_item_mob"
                      spy
                      smooth
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
                  </div>
                </div>
                <a
                  href="https://www.mec.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={meclogo} alt="" className="meclogo__mob" />
                </a>
              </div>
            </Drawer>
          </div>
        ))}
    </>
  );
}

export default Navbar;
