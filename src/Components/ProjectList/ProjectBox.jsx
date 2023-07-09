import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import './ProjectList.scss';
import { ProjectContext } from '../../contexts/ProjectContext';

function ProjectBox({ name, teamLeader, projectId }) {
  const { selectedProject } = useContext(ProjectContext);
  const isSelected = useMemo(() => projectId === selectedProject.id, [
    projectId,
    selectedProject,
  ]);

  return (
    <div
      className={`d-flex align-items-center projectBox ${
        isSelected ? 'selected' : ''
      }`}
    >
      <div className="text">
        <h5 className="text-uppercase">{name}</h5>
        <h6 className="text-capitalize">{teamLeader}</h6>
      </div>
      <i className="fa fa-play-circle playIcon" />
    </div>
  );
}

ProjectBox.propTypes = {
  name: PropTypes.string.isRequired,
  teamLeader: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default ProjectBox;
