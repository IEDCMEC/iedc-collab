import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InternshipList from "./InternshipList/InternshipList";
import "./Internship.scss";
import InternshipDetails from "./InternshipDetails/InternshipDetails";

const InternshipView = () => {
 
  return (
    <>
      <Container fluid={true} className={"project-container"}>
        <Row className={"h-100"}>
        <Col sm={4} className={"h-100 m-0 pr-2 p-0 shadow-right"}>
          <Col className={"h-100 m-0 p-0"}>
            <InternshipList />
          </Col>
        </Col>
        <Col className={"h-100"}>
          <InternshipDetails/>
        </Col>
        </Row>
      </Container>
    </>
  );
};
export default InternshipView;
