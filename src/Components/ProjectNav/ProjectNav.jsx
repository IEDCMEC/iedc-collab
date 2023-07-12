import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import './ProjectNav.scss';
import JoinTeamModal from '../JoinTeamModal/JoinTeamModal';
import { getUser } from '../../Firebase/firebase';
import { AuthContext } from '../../Firebase/Auth/Auth';
import SuspenseLoader from '../SuspenseLoader/SuspenseLoader';

function ProjectNav({ selectedProject }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const getDev = async (id) => {
    const userVal = await getUser(id);
    setUser(await userVal.val());
    setLoading(false);
  };
  useEffect(() => {
    getDev(selectedProject.leader_id);
  }, [selectedProject.leader_id]);
  const [open, setOpen] = useState(false);
  if (loading) {
    return <SuspenseLoader />;
  }
  return (
    <div className="project-nav__container">
      <div className="project-nav__title-icon">
        <div className=" project-nav__profile">
          <img
            src={
              user.profilePhoto ||
              'https://sabt.center/wp-content/uploads/2014/08/avatar-1.png'
            }
            alt="profile"
          />
        </div>
        <div className="project-nav__title">
          {selectedProject.leader_name.toLowerCase()}
        </div>
      </div>
      <div className="project-nav__likes-join">
        {/* <div className="project-nav__likes"> */}
        {/* <img src={like} alt="like" className="project-nav__like" /> */}
        {/* <div className="project-nav__number-likes">
            15 <span className="projectnav-likes">Likes</span>
          </div> */}
        {/* </div> */}
        {selectedProject.teamMembers?.some(
          (x) => x === currentUser?.email || selectedProject?.isReq === false
        ) ? (
          ''
        ) : (
          <button
            className="project-nav__button"
            onClick={() => {
              if (currentUser) {
                setOpen(true);
              } else {
                window.alert('Please Login to continue');
              }
            }}
            type="button"
          >
            Join Team
          </button>
        )}
      </div>
      {currentUser ? (
        <JoinTeamModal
          open={open}
          onClose={() => setOpen(false)}
          user={currentUser}
          project={selectedProject}
        />
      ) : (
        ''
      )}
    </div>
  );
}

ProjectNav.propTypes = {
  selectedProject: PropTypes.shape({
    leader_id: PropTypes.string,
    leader_name: PropTypes.string,
    teamMembers: PropTypes.arrayOf(PropTypes.string),
    isReq: PropTypes.bool,
  }).isRequired,
};

export default ProjectNav;
