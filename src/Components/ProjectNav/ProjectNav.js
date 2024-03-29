import React, { useEffect, useState } from "react";
import "./ProjectNav.scss";
// import { ProjectContext } from "../../contexts/ProjectContext";
// import like from "../../assets/like.png";
import JoinTeamModal from "../JoinTeamModal/JoinTeamModal";
import { getUser } from "../../Firebase/firebase";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { useContext } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import SuspenseLoader from "../SuspenseLoader/SuspenseLoader";
import { useHistory, Link } from "react-router-dom";
const ProjectNav = ({ selectedProject }) => {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const getDev = async (id) => {
    // const user = await getUser(id);
    setUser(await getUser(id));
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
      <div className="view_projects">
          <div className="left-arrow">
            <BsArrowLeftCircle
              color="#9e0000"
              size={40}
              onClick={() => history.goBack()}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <Link
            to={
              currentUser?.uid === selectedProject.leader_id
                ? `/profile`
                : `/developers/${selectedProject.leader_id}`
            }
            className="project-nav_profile-link"
          >
            <div className="project-nav__title-icon">
              <div className="project-nav__profile">
                <img
                  src={
                    user.profilePhoto ||
                    "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
                  }
                  alt="profile"
                />
              </div>
            </div>
            <div className="project-nav__title">
              {selectedProject.leader_name.toLowerCase()}
            </div>
          </Link>
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
          ""
        ) : (
          <div
            className="project-nav__button"
            onClick={() => {
              if (currentUser) {
                setOpen(true);
              } else {
                window.alert("Please Login to continue");
              }
            }}
          >
            Join Team
          </div>
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
        ""
      )}
    </div>
  );
};

export default ProjectNav;
