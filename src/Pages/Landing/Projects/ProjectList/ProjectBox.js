import React from "react";
import { Col } from "react-bootstrap";
import "./ProjectList.scss";
import PropTypes from "prop-types";

const ProjectBox = (props) => {
  const { name, skills, projectName } = props;
  return (
    <>
      <Col className={"p-3 mt-2 project-name-box"}>
        <div>
          <h5 className={"pt-1 col1"}>{name}</h5>
          <h6 className={"col2"}>{projectName}</h6>
          <div className={"pb-2"}>
            <span className={"col1 font-weight-bold"}> Skills Required :</span>
            <span className={"col2"}>{skills.map((x) => `${x} `)}</span>
          </div>
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