import React, { useContext, useMemo } from "react";
import "./ProjectList.scss";
import { ProjectContext } from "../../../../../contexts/ProjectContext";

const ProjectBox = ({ name, teamLeader, projectId }) => {
  const { selectedProject } = useContext(ProjectContext);
  const isSelected = useMemo(() => projectId === selectedProject.id, [
    projectId,
    selectedProject,
  ]);

  return (
    <div
      className={`d-flex align-items-center projectBox ${
        isSelected ? "selected" : ""
      }`}
    >
      <div className="text">
        <h5 className="text-uppercase">{name}</h5>
        <h6 className={"text-capitalize"}>{teamLeader}</h6>
      </div>
      <i className="fa fa-play-circle playIcon"></i>
    </div>
  );
};

export default ProjectBox;
