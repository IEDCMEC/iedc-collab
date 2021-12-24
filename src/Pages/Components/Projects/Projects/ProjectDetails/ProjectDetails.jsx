import React, { useContext, useEffect, useState } from "react";
import "./ProjectDetails.scss";
import { Row, Col, Button } from "react-bootstrap";
// import ProjectContext from "../../../../Collab/ProjectContext";
import { ProjectContext } from "../../../../../contexts/ProjectContext";
import { AuthContext } from "../../../../../Firebase/Auth/Auth";
import { doDeleteProject, getUser } from "../../../../../Firebase/firebase";
import { useHistory } from "react-router";
import NewProjectModal from "../../../NewProjectModal/NewProjectModal";
const ProjectDetails = (props) => {
  const { selectedProject } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [deleteProject, setDeleteProject] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
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
      setDeleteProject(true); setEditProject(true);
      console.log(deleteProject);
    } else {
      setDeleteProject(false); setEditProject(false);
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
    <div className={"d-flex h-100 flex-column project-description"}>
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
      <Row className={"p-5 flex-grow-1 overflow  description"}>
        <div className="contents ">
          <div>
            <h4>PROJECT DESCRIPTION</h4>
            {selectedProject.desc}

            <div className="team">
              <h4>TEAM MEMBERS</h4>
            </div>
            <div className="members">
              <ol>
                <li>Rindish Krishna</li>
                <li>Rindish Krishna</li>
              </ol>
            </div>

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
      
           {editProject ?
         <Button
              variant="danger"
              className="edit-btn"
              onClick={() => {
                setShowNewProjectModal(true);
              }}
            >
              Edit Project
            </Button> : null}
          
        </div>
      </Row>
      <NewProjectModal
        show={showNewProjectModal}
        onHide={() => setShowNewProjectModal(false)}
        project = {selectedProject}
      />
    </div>
  );
};
export default ProjectDetails;
