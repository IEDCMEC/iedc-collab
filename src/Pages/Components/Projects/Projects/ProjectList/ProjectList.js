import React, { useContext } from "react";
import ProjectBox from "./ProjectBox";
import { Col } from "react-bootstrap";
import ProjectContext from "../../../../Collab/ProjectContext";
import { getProject } from "../../../../../Firebase/firebase";
const ProjectList = (props) => {
  const { projects } = useContext(ProjectContext);
  const { project } = useContext(ProjectContext);
  //    console.log(project[0])
  function activeProject(id) {
    getProject(id)
      .then(async function (snapshot) {
        let messageObject = snapshot.val();
        messageObject.id = id;
        project[1](messageObject);
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
      });
  }
  return (
    <Col className={" overflow "}>
      {projects.map((x) => {
        return (
          <div
            className="content post-item"
            onClick={() => {
              activeProject(x.id);
              props.setMobileComponent(true);
              console.log("true");
            }}
          >
            <ProjectBox name={x.name} teamLeader={x.leader_name} />
          </div>
        );
      })}
    </Col>
  );
};

export default ProjectList;
