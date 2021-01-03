import React, { useContext, useEffect, useState } from "react";
import "./ProjectDetails.scss";
import { Row, Col, Button } from "react-bootstrap";
import ProjectContext from "../../../../Collab/ProjectContext";
import { AuthContext } from "../../../../../Firebase/Auth/Auth";
import { doDeleteProject, getUser } from "../../../../../Firebase/firebase";
import { propTypes } from "react-bootstrap/esm/Image";
const ProjectDetails = (props) => {
  const { project } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [deleteProject, setDeleteProject] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // console.log(project[0].id)
  useEffect(() => {
    if (project[0].leader_id !== undefined) {
      getUser(project[0].leader_id)
        .then(async function (snapshot) {
          let result = snapshot.val();
          setEmail(result.email);
          setPhoneNumber(result.phone_number);
        })
        .catch(function (error) {
          alert("Something went wrong");
          console.log(error);
        });
    }
    if (currentUser.uid == project[0].leader_id) {
      setDeleteProject(true);
      console.log(deleteProject);
    } else {
      setDeleteProject(false);
    }
  }, [project]);
  function deleteProj(id) {
    doDeleteProject(id);
    window.location.reload(false);
  }
  return (
    <div className={"d-flex h-100 flex-column "}>
      {props.mobileComponentClicked ? (
        <Row>
          <Col
            className={"  heading col-sm background-color-white"}
            style={{ padding: "1rem 1rem 1rem 2rem" }}
          >
            <Button
              variant="light"
              onClick={() => props.setMobileComponent(false)}
            >
              Project List
            </Button>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col
          className={"p-4 shadow-bottom heading col-sm background-color-white"}
          style={{ textAlign: "center" }}
        >
          <div className={"flex-grow-1"}>
            <h5 className={"text-size-responsive"}>{project[0].name}</h5>
          </div>
          <div className={" flex-grow-1 left-right-margin"}>
            <div>
              <h5 className={"text-size-responsive}"}>
                {project[0].leader_name}
              </h5>
            </div>
          </div>
          <div className={"flex-grow-1"}>
            <div>
              <h5 className={"text-size-responsive"}>
                {email}
              </h5>
              <h5 className={"text-size-responsive"}>
                {phoneNumber}
              </h5>
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
            <a href="http://${links}" rel="noopener noreferrer" target="_blank">
              {project[0].links}
            </a>
          </div>
          {deleteProject ? (
            <Button
              onClick={() => {
                deleteProj(project[0].id);
              }}
            >
              Delete Project
            </Button>
          ) : null}
        </div>
      </Row>
    </div>
  );
};

export default ProjectDetails;
