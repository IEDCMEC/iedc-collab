import React, { useContext, useEffect, useState } from "react";
import "./ProjectDetails.scss";
import { Row, Col, Button } from "react-bootstrap";
// import ProjectContext from "../../../../Collab/ProjectContext";
import { ProjectContext } from "../../../../../contexts/ProjectContext";
import { AuthContext } from "../../../../../Firebase/Auth/Auth";
import { doDeleteProject, getUser } from "../../../../../Firebase/firebase";
import { useHistory } from "react-router";

const ProjectDetails = (props) => {
  const { selectedProject } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [deleteProject, setDeleteProject] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();

  let linkHeading;
  console.log(selectedProject);

  useEffect(() => {
    if (selectedProject.leader_id !== undefined) {
      getUser(selectedProject.leader_id)
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
    if (currentUser?.uid === selectedProject.leader_id) {
      setDeleteProject(true);
      console.log(deleteProject);
    } else {
      setDeleteProject(false);
    }

    if (selectedProject.links !== undefined) {
      linkHeading = "Links";
    } else {
      linkHeading = null;
    }
  }, [selectedProject]);

  function deleteProj(id) {
    doDeleteProject(id);
    history.go(0);
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
            <h5 className={"text-size-responsive"}>{selectedProject.name}</h5>
          </div>
          <div className={" flex-grow-1 left-right-margin"}>
            <div>
              <h5 className={"text-size-responsive}"}>
                {selectedProject.leader_name}
              </h5>
            </div>
          </div>
          <div className={"flex-grow-1"}>
            <div>
              <h5 className={"text-size-responsive"}>{email}</h5>
              <h5 className={"text-size-responsive"}>{phoneNumber}</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className={"p-5 flex-grow-1 overflow"}>
        <div className="contents">
          <div>
            <h4>Description</h4>
            {selectedProject.desc}

            <h4>{linkHeading}</h4>

            <a
              href={selectedProject.links}
              rel="noopener noreferrer"
              target="_blank"
            >
              {selectedProject.links}
            </a>
          </div>
          {deleteProject ? (
            <Button
              variant="danger"
              className="delete-btn"
              onClick={() => {
                deleteProj(selectedProject.id);
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
