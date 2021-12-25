import React, { useContext, useEffect, useState } from "react";
import "./ProjectDetails.scss";
import { useHistory } from "react-router";
import { ProjectContext } from "../../contexts/ProjectContext";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { doDeleteProject } from "../../Firebase/firebase";
import Phoneicon from "../../assets/Phoneicon.png";
import Mail from "../../assets/Mail.png";
import Github from "../../assets/Github.png";
import Bin from "../../assets/Bin.png";
import Edit from "../../assets/Edit.png";
import Link from "../../assets/Link.png";
import Navigate from "../../assets/Navigate.png";
import ProjectModal from "../ProjectModal/ProjectModal";

const ProjectDetails = (props) => {
  const { selectedProject } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
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
              alt="Leader profile pic"
            ></img>
            <p>{selectedProject.leader_name}</p>
          </div>
          <div className="ProjectDetails-imagediv">
            <a href={`tel:${selectedProject.contactNo}`}>
              <img src={Phoneicon} alt="phone-icon"></img>
            </a>
            <a href={`mailto: ${selectedProject.leaderEmail}`}>
              <img src={Mail} alt="mail"></img>
            </a>
            <a href={selectedProject.githubLink}>
              <img src={Github} alt="github"></img>
            </a>
          </div>
        </div>
      </div>
      <div className={"flex-grow-1 description"}>
        <div className="ProjectDetails-sidedesc">
          <p>{selectedProject.name}</p>
        </div>

        <div className="contents">
          <div
            className="contents-subdiv"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4>PROJECT DESCRIPTION</h4>
            <p style={{ whiteSpace: "pre-line" }}>{selectedProject.desc}</p>
            {selectedProject.teamMembers?.length && (
              <div>
                <div className="team">
                  <h4>TEAM MEMBERS</h4>
                </div>
                <div className="members">
                  <ol>
                    {selectedProject.teamMembers.map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
            {selectedProject.tags?.length ? (
              <div className="ProjectDetail-tagdiv">
                <img
                  src={Link}
                  alt="tag icon"
                  style={{ marginRight: "10px" }}
                ></img>
                <p>#{selectedProject.tags.join(", #")}</p>
              </div>
            ) : (
              ""
            )}
            {selectedProject.links.length ? (
              <div
                className="ProjectDetail-linkdiv"
                style={{ display: "flex" }}
              >
                {selectedProject.links.map((link) => (
                  <div key={link} className="ProjectDetail-links">
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      style={{ marginRight: "10" }}
                      href={link.startsWith("http") ? link : "http://" + link}
                    >
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            {selectedProject.contactNo && ( // display only on large screns
              <div className="d-flex align-self-start d-none d-md-block mt-3">
                <h4 className="font-weight-bolder mr-2">Contact Number: </h4>
                <h5>{selectedProject.contactNo}</h5>
              </div>
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
            onClick={() => {
              setShowNewProjectModal(true);
            }}
          ></img>
        )}
      </div>
      <ProjectModal
        show={showNewProjectModal}
        onHide={() => setShowNewProjectModal(false)}
        project={selectedProject}
      />
    </div>
  );
};
export default ProjectDetails;

export const ProjectDetailMob = ({ setShowProjectDetailsNotList }) => {
  const { selectedProject } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
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
    <div className="ProjectDetailMob-maindiv">
      <div className="ProjectDetailMob-headerdiv">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="ProjectDetailsmob-headerLeft"
        >
          <img
            alt="Leader profile pic"
            src={
              selectedProject.projectPhoto ||
              "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
            }
          ></img>
          <div className="ProjectDetailMob-imgdiv">
            <p>{selectedProject.leader_name}</p>

            <a href={`tel:${selectedProject.contactNo}`}>
              <img src={Phoneicon} alt="phone-icon"></img>
            </a>
            <a href={`mailto: ${selectedProject.leaderEmail}`}>
              <img src={Mail} alt="mail"></img>
            </a>
            <a href={selectedProject.githubLink}>
              <img src={Github} alt="github"></img>
            </a>
          </div>
        </div>
        <div
          className="ProjectDetailmob-Navdiv"
          onClick={() => setShowProjectDetailsNotList(false)}
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
          <p style={{ whiteSpace: "pre-line" }}>{selectedProject.desc}</p>
          {selectedProject.teamMembers?.length && (
            <div>
              <div className="team">
                <h4>TEAM MEMBERS</h4>
              </div>
              <div className="members">
                <ol style={{ paddingTop: "0" }}>
                  {selectedProject.teamMembers.map((member) => (
                    <p key={member}>
                      <li className="ProjectDetailsmob-members">{member}</li>
                    </p>
                  ))}
                </ol>
              </div>
            </div>
          )}
          {selectedProject.tags?.length ? (
            <div className="ProjectDetail-tagdiv">
              <img
                src={Link}
                alt="tag icon"
                style={{ marginRight: "10px" }}
              ></img>
              {selectedProject.tags.map((tag, index) => (
                <p
                  rel="noopener noreferrer"
                  style={{ marginRight: "10" }}
                  key={index}
                >
                  #{tag}
                </p>
              ))}
            </div>
          ) : (
            ""
          )}
          {selectedProject.links?.length ? (
            <div className="ProjectDetail-linkdiv" style={{ display: "flex" }}>
              {selectedProject.links.map((link) => (
                <div key={link} className="ProjectDetail-links">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ marginRight: "10" }}
                    href={link.startsWith("http") ? link : "http://" + link}
                  >
                    {link}
                  </a>
                </div>
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
            onClick={() => {
              setShowNewProjectModal(true);
            }}
          ></img>
        )}
      </div>
      <ProjectModal
        show={showNewProjectModal}
        onHide={() => setShowNewProjectModal(false)}
        project={selectedProject}
      />
    </div>
  );
};
