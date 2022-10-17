import React, { useContext, useState } from "react";
import "./ProjectNav.scss";
import { ProjectContext } from "../../contexts/ProjectContext";
import like from "../../assets/like.png";
import JoinTeamModal from "../JoinTeamModal/JoinTeamModal";

const ProjectNav = ({selectedProject}) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="project-nav__container">
      <div className="project-nav__title-icon">
        <div className=" project-nav__profile">
          <img
            src={
              selectedProject.leaderImg ||
              "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
            }
            alt="profile"
          />
        </div>
        <div className="project-nav__title">{selectedProject.leader_name.toLowerCase()}</div>
      </div>
      <div className="project-nav__likes-join">
        <div className="project-nav__likes">
          <img src={like} alt="like" className="project-nav__like" />
          <div className="project-nav__number-likes">
            15 <span className="projectnav-likes">Likes</span>
          </div>
        </div>
        <div className="project-nav__button" onClick={() => setModalShow(true)}>
          Join Team
        </div>
      </div>
      <JoinTeamModal show={modalShow}
        onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ProjectNav;
