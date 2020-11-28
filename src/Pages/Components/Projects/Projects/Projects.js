import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectList from "./ProjectList/ProjectList";
import "./Project.scss";
import ProjectDetails from "./ProjectDetails/ProjectDetails";

const ProjectsView = () => {
  return (
    <>
      <Container fluid={true} className={"project-container"}>
        <Row className={"h-100"}>
        <Col sm={4} className={"h-100 m-0 pr-2 p-0 shadow-right"}>
          <Col className={"h-100 m-0 p-0"}>
            <ProjectList />
          </Col>
        </Col>
        <Col className={"h-100"}>
          <ProjectDetails/>
        </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProjectsView;
