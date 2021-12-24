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
  console.log(selectedProject);
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
                selectedProject.projectPhoto ||
                "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
              }
            ></img>
            <p>{selectedProject.leader_name}</p>
          </div>
          <div className="ProjectDetails-imagediv">
            <a href={`tel:${selectedProject.contactNo}`}>
              <img src={Phoneicon}></img>
            </a>
            <a href={`mailto: ${selectedProject.leaderEmail}`}>
              <img src={Mail}></img>
            </a>
            <a href={selectedProject.githubLink}>
              <img src={Github}></img>
            </a>
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
            {selectedProject.tags ? (
              <div className="ProjectDetail-tagdiv">
               <img
                      src={Link}
                      alt="tag icon"
                      style={{ marginRight: "10px" }}
                    ></img>
                {selectedProject.tags.map((tag) => (
                  <>
                    <p
                      rel="noopener noreferrer"
                     
                      style={{ marginRight: "10" }}
                      
                    >
                      #{tag}
                    </p>
                  </>
                ))}
              </div>
            ) : (
              ""
            )}
            {selectedProject.links.length ? (
              <div className="ProjectDetail-linkdiv">
               
                {selectedProject.links.map((link) => (
                  <>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      style={{ marginRight: "10" }}
                      href={link.startsWith("http") ? link : "http://" + link}
                    >
                      {link}
                    </a>
                  </>
                ))}
              </div>
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
            src={
              selectedProject.projectPhoto ||
              "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
            }
          ></img>
          <div className="ProjectDetailMob-imgdiv">
            <p>{selectedProject.leader_name}</p>

            <a href={`tel:${selectedProject.contactNo}`}>
              <img src={Phoneicon}></img>
            </a>
            <a href={`mailto: ${selectedProject.leaderEmail}`}>
              <img src={Mail}></img>
            </a>
            <a href={selectedProject.githubLink}>
              <img src={Github}></img>
            </a>
          </div>
        </div>
        <div
          className="ProjectDetailmob-Navdiv"
          onClick={() => setdispmobDetails(false)}
        >
          <img src={Navigate} className="ProjectDetailMob-headerRight"></img>
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
            <ol style={{paddingTop:"0"}}>
              {Array.isArray(selectedProject.teamMembers) &&
                selectedProject.teamMembers.map((member) => (
                  <p>
                    <li className="ProjectDetailsmob-members">{member}</li>
                  </p>
                ))}
            </ol>
          </div>
          {selectedProject.tags ? (
              <div className="ProjectDetail-tagdiv">
               <img
                      src={Link}
                      alt="tag icon"
                      style={{ marginRight: "10px" }}
                    ></img>
                {selectedProject.tags.map((tag) => (
                  <>
                    <p
                      rel="noopener noreferrer"
                     
                      style={{ marginRight: "10" }}
                      
                    >
                      #{tag}
                    </p>
                  </>
                ))}
              </div>
            ) : (
              ""
            )}
          {selectedProject.links.length ? (
            <div className="ProjectDetail-linkdiv">
            
              {selectedProject.links.map((link) => (
                <>
                  <a rel="noopener noreferrer" target="_blank" href={link}>
                    {link}
                  </a>
                </>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

       
      </div>
      <div className="ProjectDetailsmob-Bottomdiv">
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
