import React from 'react';
import PropTypes from 'prop-types';
import './ProjectToggle.scss';

function ProjectToggle({ setToggle, selectedProject, toggle }) {
  return (
    <div className="project-toggle__container">
      <div className="project-toggle__title">{selectedProject.name}</div>
      <div className="project-toggle__NavbarItems">
        <button
          type="button"
          className={`project-toggle__NavLinks__desc ${
            toggle === 1 && 'project-toggle__NavLinksActive'
          }`}
          to="/description"
          onClick={(e) => {
            e.preventDefault();
            setToggle(1);
          }}
        >
          Description
        </button>
        <button
          type="button"
          className={`project-toggle__NavLinks ${
            toggle === 2 && 'project-toggle__NavLinksActive'
          }`}
          to="/requirements"
          onClick={(e) => {
            e.preventDefault();
            setToggle(2);
          }}
        >
          Requirements
        </button>
        <button
          type="button"
          className={`project-toggle__NavLinks__disc ${
            toggle === 3 && 'project-toggle__NavLinksActive'
          }`}
          to="/discussion"
          onClick={(e) => {
            e.preventDefault();
            setToggle(3);
          }}
        >
          Discussion
        </button>
      </div>
    </div>
  );
}

ProjectToggle.propTypes = {
  setToggle: PropTypes.func.isRequired,
  selectedProject: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  toggle: PropTypes.number.isRequired,
};

export default ProjectToggle;
