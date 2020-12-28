import React, { useState, useLayoutEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import InternshipList from "./InternshipList/InternshipList";
import "./Internship.scss";
import InternshipDetails from "./InternshipDetails/InternshipDetails";

const InternshipView = () => {
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
                <InternshipDetails
                  mobileComponentClicked={mobileComponentClicked}
                  setMobileComponent={setMobileComponent}
                />
              ) : (
                <InternshipList setMobileComponent={setMobileComponent} />
              )}
            </Col>
          </Col>
          <Col className={"h-100  internshipDetails"}>
            <InternshipDetails />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default InternshipView;
