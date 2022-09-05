import React, { useContext, useMemo } from "react";
import './ProjectCarousel.scss'
import { ProjectContext } from "../../contexts/ProjectContext";

function ProjectCard({ name, teamLeader, projectId })
{
  const { selectedProject } = useContext(ProjectContext);
  const isSelected = useMemo(() => projectId === selectedProject.id, [
    projectId,
    selectedProject,
  ]);

    return(<>
    <div className="project-card" style={{
          backgroundColor: isSelected ? '#AC2727' : '#FFFFFF',
          color: isSelected ? '#FFFFFF' : '#AC2727',
        }}>
        <div className="project-card__title">{name}</div>
        <div className="project-card__lead">{teamLeader}</div>
        </div>
    </>);
}

export default ProjectCard