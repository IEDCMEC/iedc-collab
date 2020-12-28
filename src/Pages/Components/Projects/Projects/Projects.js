import React, { useLayoutEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectList from "./ProjectList/ProjectList";
import "./Project.scss";
import ProjectDetails from "./ProjectDetails/ProjectDetails";

const ProjectsView = () => {
  const [mobileComponentClicked, setMobileComponent] = useState(false);
  const [width, setWidth] = useState(0);
  const breakpoint = 620;
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <Container fluid={true} className={"project-container"}>
        <Row className={"h-100"}>
          <Col sm={4} className={"h-100 m-0  p-0 shadow-right"}>
            <Col className={"h-100 m-0 p-0"}>
              {width < breakpoint && mobileComponentClicked ? (
                <ProjectDetails
                  mobileComponentClicked={mobileComponentClicked}
                  setMobileComponent={setMobileComponent}
                />
              ) : (
                <ProjectList setMobileComponent={setMobileComponent} />
              )}
            </Col>
          </Col>
          <Col className={"h-100 projectDetails"}>
            <ProjectDetails />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProjectsView;
