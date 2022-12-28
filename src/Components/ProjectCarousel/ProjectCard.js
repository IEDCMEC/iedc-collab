import React, { useMemo } from "react";
import "./ProjectCarousel.scss";
// import { ProjectContext } from "../../contexts/ProjectContext";

function ProjectCard({ name, teamLeader, projectId, project }) {
  const isSelected = useMemo(() => projectId === project.id, [
    projectId,
    project,
  ]);
  return (
    <>
      <div
        className="project-card"
        style={{
          backgroundColor: isSelected ? "#AC2727" : "#FFFFFF",
          color: isSelected ? "#FFFFFF" : "#AC2727",
        }}
      >
        <div className="project-card__title">{name}</div>
        <div className="project-card__lead">{teamLeader}</div>
      </div>
    </>
  );
}

export default ProjectCard;
