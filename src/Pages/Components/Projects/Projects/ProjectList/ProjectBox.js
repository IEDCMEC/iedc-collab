import React from "react";
import { Col } from "react-bootstrap";
import "./ProjectList.scss";
import PropTypes from "prop-types";

const ProjectBox = (props) => {
  const { name, teamLeader } = props;
  return (
    <>
      <Col className={"p-3 mt-2 project-name-box"}>
        <div>
          <h5 className={"pt-1 col1"}>{name}</h5>
          <h6 className={"col2"}>{teamLeader}</h6>
        </div>
      </Col>
    </>
  );
};

ProjectBox.prototype = {
  projectName: PropTypes.string,
  name: PropTypes.string,
  skills: PropTypes.array,
};

export default ProjectBox