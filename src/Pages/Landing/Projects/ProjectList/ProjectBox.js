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
        <svg class="bi bi-bookmark-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M3 3a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V3z" clip-rule="evenodd"/>
</svg>
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