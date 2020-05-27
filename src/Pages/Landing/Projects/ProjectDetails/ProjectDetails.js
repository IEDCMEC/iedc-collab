import React from "react";
import "./ProjectDetails.scss";
import { Row, Col } from "react-bootstrap";
import TeamSect from "../../TeamSect";

const ProjectDetails = () => {
  return (
    <div className={"d-flex h-100 flex-column "}>
      <Row>
        <Col className={"p-5 shadow-bottom heading col-sm background-color-white"}>
          <div className={"flex-grow-1"}>
            <div>
              <h4>Project Title</h4>
              <h5 className={"font-weight-light"}>tagline</h5>
            </div>
          </div>
          <div className={" fix-flex left-right-margin"}>
            <div>
              <h4>Name</h4>
              <h5 className={"font-weight-light"}>Team Leader</h5>
            </div>
          </div>
          <div className={"fix-flex"}>
            <div>
              <h4>Contact</h4>
              <h5 className={"font-weight-light"}>xyz@gmail.com</h5>
            </div>
          </div>
        </Col>
      </Row>
      
      <Row className={"p-5 flex-grow-1 overflow"}>
        <div class="contents">
        <div >
          <TeamSect/>
          <h5>Heading</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
          <div>
              <h5>Heading</h5>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
              </p>
          </div>
          <div>
              <h5>Heading</h5>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
              </p>
          </div>
          <div>
              <h5>Heading</h5>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
              </p>
          </div>
          </div>
      </Row>
    </div>
  );
};

export default ProjectDetails;
