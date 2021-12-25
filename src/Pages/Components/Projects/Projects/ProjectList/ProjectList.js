import React, { useContext } from "react";
import ProjectBox from "./ProjectBox";
import { Col } from "react-bootstrap";
import { ProjectContext } from "../../../../../contexts/ProjectContext";

const ProjectList = ({ width, setdispmobDetails }) => {
  const { projects, setSelectedProject } = useContext(ProjectContext);

  return (
    <Col className={" overflow "} style={{ maxHeight: "90vh" }}>
      {projects.map((x) => (
        <div
          className="content post-item"
          key={x.id}
          onClick={() => {
            setSelectedProject(x);
            if (width < 768) setdispmobDetails(true);
          }}
        >
          <ProjectBox
            name={x.name}
            teamLeader={x.leader_name}
            projectId={x.id}
          />
        </div>
      ))}
    </Col>
  );
};

export default ProjectList;
