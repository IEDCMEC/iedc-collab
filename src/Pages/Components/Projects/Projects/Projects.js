import React, { useLayoutEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectList from "./ProjectList/ProjectList";
import "./Project.scss";
import ProjectDetails, {
  ProjectDetailMob,
} from "./ProjectDetails/ProjectDetails";

const breakpoint = 700;
const ProjectsView = ({ hideMobileSideNav }) => {
  const [mobileComponentClicked, setMobileComponent] = useState(false);
  const [width, setWidth] = useState(0);
  const [dispmobDetails, setdispmobDetails] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      const w = window.innerWidth;
      setWidth(w);
      if (w < 768) setdispmobDetails(true);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Container fluid={true} className={"project-container"}>
      {!dispmobDetails ? (
        <Row className={"h-100"}>
          <Col md={4} className={"h-100 m-0  p-0 shadow-right"}>
            <Col className={"h-100 m-0 p-0"}>
              {width < breakpoint &&
              (mobileComponentClicked || hideMobileSideNav) ? (
                <ProjectDetails
                  mobileComponentClicked={mobileComponentClicked}
                  setMobileComponent={setMobileComponent}
                />
              ) : (
                <ProjectList
                  setMobileComponent={setMobileComponent}
                  setdispmobDetails={setdispmobDetails}
                  width={width}
                />
              )}
            </Col>
          </Col>
          <Col className={"h-100 projectDetails"}>
            <ProjectDetails />
          </Col>
        </Row>
      ) : (
        <ProjectDetailMob
          setdispmobDetails={setdispmobDetails}
        ></ProjectDetailMob>
      )}
    </Container>
  );
};
export default ProjectsView;
