import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './ProjectCarousel.scss';

function ProjectCard({ name, teamLeader, projectId, project }) {
  const isSelected = useMemo(() => projectId === project.id, [
    projectId,
    project,
  ]);
  return (
    <div
      className="project-card"
      style={{
        backgroundColor: isSelected ? '#AC2727' : '#FFFFFF',
        color: isSelected ? '#FFFFFF' : '#AC2727',
      }}
    >
      <div className="project-card__title">{name}</div>
      <div className="project-card__lead">{teamLeader}</div>
    </div>
  );
}

ProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  teamLeader: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectCard;
