import React, { useMemo } from "react";
import "./ProjectCarousel.scss";
import Tooltip from "@mui/material/Tooltip";

function ProjectCard({ name, teamLeader, projectId, project }) {
  const isSelected = useMemo(() => projectId === project.id, [
    projectId,
    project,
  ]);

  const arr = name.split(" ");
  const firstFiveWords = arr.slice(0, 5).join(" "); // Take the first five words

  const count = arr.filter((word) => word !== "").length;

  const renderContent = () => (
    <div
      className="project-card"
      style={{
        backgroundColor: isSelected ? "#AC2727" : "#FFFFFF",
        color: isSelected ? "#FFFFFF" : "#AC2727",
      }}
    >
      <div className="project-card__title">{firstFiveWords}</div>
      <div className="project-card__lead">{teamLeader}</div>
    </div>
  );

  return (
    <>
      {count > 5 ? (
        <Tooltip style={{ backgroundColor: "black" }} title={name}>
          {renderContent()}
        </Tooltip>
      ) : (
        renderContent()
      )}
    </>
  );
}

export default ProjectCard;
