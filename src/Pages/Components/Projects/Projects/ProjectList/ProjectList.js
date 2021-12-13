import React, { useContext } from "react";
import ProjectBox from "./ProjectBox";
import { Col } from "react-bootstrap";
import { ProjectContext } from "../../../../../contexts/ProjectContext";

const ProjectList = (props) => {
  const { projects, setProject } = useContext(ProjectContext);

  return (
    <Col className={" overflow "}>
      {projects.map((x) => {
        return (
          <div
            className="content post-item"
            key={x.id}
            onClick={() => {
              // props.setMobileComponent(true);
              setProject(x);
            }}
          >
            <ProjectBox
              name={x.name}
              teamLeader={x.leader_name}
              projectId={x.id}
            />
          </div>
        );
      })}
    </Col>
  );
};

export default ProjectList;
