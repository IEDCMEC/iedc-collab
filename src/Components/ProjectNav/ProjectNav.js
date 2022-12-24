import React, { useEffect, useState } from "react";
import "./ProjectNav.scss";
// import { ProjectContext } from "../../contexts/ProjectContext";
import like from "../../assets/like.png";
import JoinTeamModal from "../JoinTeamModal/JoinTeamModal";
import { getUser } from "../../Firebase/firebase";
import { AuthContext } from "../../Firebase/Auth/Auth";
import {useContext} from "react"


const ProjectNav = ({ selectedProject }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const getDev = async (id) => {
    const user = await getUser(id);
    setUser(await user.val());
    setLoading(false);
  };
  useEffect(() => {
    getDev(selectedProject.leader_id);
  }, [selectedProject.leader_id]);
  const [modalShow, setModalShow] = useState(false);
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "90vh" }}
      >
        <div className="spinner-border" role="status"></div>
        <div className="mt-3">Loading Project...</div>
      </div>
    );
  }
  return (
    <div className="project-nav__container">
      <div className="project-nav__title-icon">
        <div className=" project-nav__profile">
          <img
            src={
              user.profilePhoto ||
              "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
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
        <div className="project-nav__button" onClick={() => setModalShow(true)}>
          Join Team
        </div>
      </div>
      <JoinTeamModal show={modalShow} onHide={() => setModalShow(false)} user={currentUser} project={selectedProject}/>
    </div>
  );
};

export default ProjectNav;
