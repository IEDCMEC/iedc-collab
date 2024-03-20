import React from "react";
import "./ProjectToggle.scss";
const ProjectToggle = ({ setToggle, selectedProject, toggle }) => {
  return (
    <div className="project-toggle__container">
      <div className="project-toggle__title">{selectedProject.name}</div>
      <div className="project-toggle__NavbarItems">
      <div
          className={`project-toggle__NavLinks__disc ${
            toggle === 2 && "project-toggle__NavLinksActive"
          }`}
          to="/discussion"
          onClick={(e) => {
            e.preventDefault();
            setToggle(2);
          }}
        >
          Discussion
        </div>
        <div
          className={`project-toggle__NavLinks__desc ${
            toggle === 1 && "project-toggle__NavLinksActive"
          }`}
          to="/description"
          onClick={(e) => {
            e.preventDefault();
            setToggle(1);
          }}
        >
          Description
        </div>
      </div>
    </div>
  );
};

export default ProjectToggle;
