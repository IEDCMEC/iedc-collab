import React, { useContext, useEffect, useState } from "react";
import "./ProjectDetails.scss";
import { Row, Col, Button } from "react-bootstrap";
// import ProjectContext from "../../../../Collab/ProjectContext";
import { ProjectContext } from "../../../../../contexts/ProjectContext";
import { AuthContext } from "../../../../../Firebase/Auth/Auth";
import { doDeleteProject, getUser } from "../../../../../Firebase/firebase";
import { useHistory } from "react-router";
import Phoneicon from "../../../../../assets/Phoneicon.png";
import Mail from "../../../../../assets/Mail.png";
import Github from "../../../../../assets/Github.png";
import Bin from "../../../../../assets/Bin.png";
import Edit from "../../../../../assets/Edit.png";
import Link from "../../../../../assets/Link.png";
import Navigate from "../../../../../assets/Navigate.png";

const ProjectDetails = (props) => {
  const { selectedProject } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [deleteProject, setDeleteProject] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();
  let linkHeading;
  console.log(selectedProject.links.length);
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
    <div className={"d-flex  flex-column project-description"}>
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
      <div>
        <div className="ProjectDetails-header">
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="ProjectDetails-headerLeft"
          >
            <img src="https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"></img>
            <p>{selectedProject.leader_name}</p>
          </div>
          <div className="ProjectDetails-imagediv">
            <img src={Phoneicon}></img>
            <img src={Mail}></img>
            <img src={Github}></img>
          </div>
        </div>
      </div>
      <div className={"flex-grow-1   description"}>
        <div className="ProjectDetails-sidedesc">
          <p>{selectedProject.name}</p>
        </div>

        <div className="contents ">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4>{selectedProject.name}</h4>
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
            {selectedProject.links.length !== 1 ? (
              <a
                href={selectedProject.links}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={Link} style={{ marginRight: "10px" }}></img>
                {selectedProject.links}
              </a>
            ) : (
              ""
            )}
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
      </div>
      <div className="ProjectDetails-Bottomdiv">
        <img src={Bin}></img>
        <img src={Edit}></img>
      </div>
    </div>
  );
};
export default ProjectDetails;

export const ProjectDetailMob = ({setdispmobDetails}) => {
  const { selectedProject } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [deleteProject, setDeleteProject] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();
  let linkHeading;
  console.log(selectedProject.links.length);
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
    <div className="ProjectDetailMob-maindiv">
      <div  className="ProjectDetailMob-headerdiv">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="ProjectDetailsmob-headerLeft"
        >
          <img src="https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"></img>
          <div className="ProjectDetailMob-imgdiv">
            <p>{selectedProject.leader_name}</p>
            <img src={Phoneicon}></img>
            <img src={Mail}></img>
            <img src={Github}></img>
          </div>
        </div>
        <div className="ProjectDetailmob-Navdiv" onClick={()=>setdispmobDetails(false)}>
        <img src={Navigate}  className="ProjectDetailMob-headerRight"></img>
        </div>
      </div>
      <div className="contentsmob">
        <div
        className="contentsmob-subdiv"
        
        >
          <h4>{selectedProject.name}</h4>
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
          {selectedProject.links.length !== 1 ? (
            <a
              href={selectedProject.links}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={Link} style={{ marginRight: "10px" }}></img>
              {selectedProject.links}
            </a>
          ) : (
            ""
          )}
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
      <div className="ProjectDetailsmob-Bottomdiv">
        <img src={Bin}></img>
        <img src={Edit}></img>
      </div>
    </div>
  );
};
