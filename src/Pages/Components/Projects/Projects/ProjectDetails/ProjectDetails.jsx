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
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (selectedProject.leader_id !== undefined) {
      getUser(selectedProject.leader_id)
        .then(async function (snapshot) {
          let result = snapshot.val();
          setEmail(result.email);
          setPhoneNumber(result.phone_number);
          console.log(result);
        })
        .catch(function (error) {
          alert("Something went wrong");
          console.log(error);
        });
    }
    if (currentUser?.uid === selectedProject.leader_id) {
      setCanModifyProject(true);
    } else {
      setCanModifyProject(false);
    }
  }, [currentUser?.uid, selectedProject.leader_id]);

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
            <img
              src={
                selectedProject.leaderImg ||
                "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
              }
            ></img>
            <p>{selectedProject.leader_name}</p>
          </div>
          <div className="ProjectDetails-imagediv">
            <img src={Phoneicon} alt="phone-icon"></img>
            <img src={Mail} alt="mail"></img>
            <img src={Github} alt="github"></img>
          </div>
        </div>
      </div>
      <div className={"flex-grow-1   description"}>
        <div className="ProjectDetails-sidedesc">
          <p>{selectedProject.name}</p>
        </div>

        <div className="contents ">
          <div
            className="contents-subdiv"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4>PROJECT DESCRIPTION</h4>
            <p>{selectedProject.desc}</p>

            <div className="team">
              <h4>TEAM MEMBERS</h4>
            </div>
            <div className="members">
              <ol>
                {Array.isArray(selectedProject.teamMembers) &&
                  selectedProject.teamMembers.map((member) => (
                    <li>{member}</li>
                  ))}
              </ol>
            </div>
            {selectedProject.links.length ? (
              <>
                <h4>Links</h4>
                {selectedProject.links.map((link) => (
                  <>
                    <img
                      src={Link}
                      alt="tag icon"
                      style={{ marginRight: "10px" }}
                    ></img>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={link.startsWith("http") ? link : "http://" + link}
                    >
                      {link}
                    </a>
                  </>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="ProjectDetails-Bottomdiv">
        {canModifyProject && (
          <img
            src={Bin}
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteProj(selectedProject.id);
            }}
            alt="delete project"
          />
        )}
        {canModifyProject && (
          <img
            src={Edit}
            alt="Edit Project"
            style={{ cursor: "pointer" }}
          ></img>
        )}
      </div>
    </div>
  );
};
export default ProjectDetails;

export const ProjectDetailMob = ({ setdispmobDetails }) => {
  const { selectedProject } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();
  let linkHeading;

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
      setCanModifyProject(true);
    } else {
      setCanModifyProject(false);
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
      <div className="ProjectDetailMob-headerdiv">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="ProjectDetailsmob-headerLeft"
        >
          <img
            alt="dummy-image"
            src="https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
          ></img>
          <div className="ProjectDetailMob-imgdiv">
            <p>{selectedProject.leader_name}</p>
            <img alt="phone-icon" src={Phoneicon}></img>
            <img alt="mail" src={Mail}></img>
            <img alt="github" src={Github}></img>
          </div>
        </div>
        <div
          className="ProjectDetailmob-Navdiv"
          onClick={() => setdispmobDetails(false)}
        >
          <img
            alt="navigate"
            src={Navigate}
            className="ProjectDetailMob-headerRight"
          ></img>
        </div>
      </div>
      <div className="contentsmob">
        <h4>{selectedProject.name}</h4>
        <div className="contentsmob-subdiv">
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
              <img alt="bin" src={Link} style={{ marginRight: "10px" }}></img>
              {selectedProject.links}
            </a>
          ) : (
            ""
          )}
        </div>

        {canModifyProject ? (
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
        <img
          alt="bin"
          src={Bin}
          style={{ cursor: "pointer" }}
          onClick={() => {
            deleteProj(selectedProject.id);
          }}
        ></img>
        <img alt="edit" src={Edit} style={{ cursor: "pointer" }}></img>
      </div>
    </div>
  );
};
