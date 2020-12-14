import React,{useContext} from "react";
import "./ProjectDetails.scss";
import { Row, Col } from "react-bootstrap";
import ProjectContext from '../../../../Collab/ProjectContext';
const ProjectDetails = () => {
  const {project}=useContext(ProjectContext);
  return (
    <div className={"d-flex h-100 flex-column "}>
      <Row>
        <Col
          className={"p-5 shadow-bottom heading col-sm background-color-white"}
        >
          <div className={"flex-grow-1"}>
            <div>
              {project[0].name}
            </div>
          </div>
          <div className={" fix-flex left-right-margin"}>
            <div>
              <h5 className={"font-weight-light"}>{project[0].leader_name}</h5>
            </div>
          </div>
          <div className={"fix-flex"}>
            <div>
              <h5 className={"font-weight-light"}>xyz@gmail.com</h5>
              <h5 className={"font-weight-light"}>987876743</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className={"p-5 flex-grow-1 overflow"}>
        <div className="contents">
          <div>
            <h4>Description</h4>
            {project[0].desc}
            <h4>Links</h4>
            <a
              href="http://${links}"
              rel="noopener noreferrer"
              target="_blank"
            >
              {project[0].links}
            </a>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default ProjectDetails;
