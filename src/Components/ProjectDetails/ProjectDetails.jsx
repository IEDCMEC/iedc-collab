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
import { toast } from "react-toastify";
import DeleteConfirmation from "../DeleteConfirmationModal/DeleteConfirmation";

const ProjectDetails = () => {
  const { selectedProject, fetchData } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(
    false
  );
  const history = useHistory();
  const submitDelete = (id) => {
    doDeleteProject(id, fetchData);
    setDisplayConfirmationModal(false);
    history.go(0);
    toast("Project deleted successfully");
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  useEffect(() => {
    if (currentUser?.uid === selectedProject.leader_id) {
      setCanModifyProject(true);
    } else {
      setCanModifyProject(false);
    }
  }, [currentUser?.uid, selectedProject.leader_id]);

  function deleteProj(id) {
    setDisplayConfirmationModal(true);
  }
  return (
    <div
      style={{ borderRadius: "8px" }}
      className={"d-flex  flex-column project-description"}
    >
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
              alt=""
            ></img>
            <p style={{ fontSize: "25px", fontWeight: "900" }}>
              {selectedProject.leader_name}
            </p>
          </div>
          <div className="ProjectDetails-imagediv">
            <a
              className="d-block d-md-none"
              href={`tel:${selectedProject.contactNo}`}
            >
              <img src={Phoneicon} alt="phone-icon"></img>
            </a>
            <a href={`mailto: ${selectedProject.leaderEmail}`}>
              <img src={Mail} alt="mail"></img>
            </a>
            {selectedProject.githubLink.length ? (
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noreferrer"
              >
                <img src={Github} alt="github"></img>
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className={"flex-grow-1 description"}>
        <div className="ProjectDetails-sidedesc">
          <p className="ProjectDetails-name">{selectedProject.name}</p>
        </div>

        <div className="contents">
          <div
            className="contents-subdiv"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h4 style={{ alignSelf: "center" }}>PROJECT DESCRIPTION</h4>

            <p style={{ whiteSpace: "pre-line", lineHeight: "34px" }}>
              {selectedProject.desc}
            </p>
            {selectedProject.teamMembers?.length && (
              <div>
                <div className="netTeam">
                  <div className="team">
                    <h5>TEAM MEMBERS</h5>
                  </div>
                  <div className="members">
                    <ol>
                      {selectedProject.teamMembers.map((member) => (
                        <li key={member}>{member}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}
            {selectedProject.contactNo && ( // display only on large screns
              <div className="">
                <div className="d-none d-md-block">
                  <i className="fa fa-phone" style={{ color: "white" }}></i>
                  <span className="ml-2">{selectedProject.contactNo}</span>
                </div>
              </div>
            )}
            {selectedProject.tags?.length ? (
              <div className="ProjectDetail-tagdiv">
                <img
                  src={Link}
                  alt="tag icon"
                  style={{
                    marginRight: "10px",
                    width: "15px",
                    height: "15px",
                    marginTop: "6px",
                  }}
                ></img>
                <p>#{selectedProject.tags.join(", #")}</p>
              </div>
            ) : (
              ""
            )}
            {selectedProject.links?.length ? (
              <div
                className="ProjectDetail-linkdiv"
                style={{ display: "flex" }}
              ></div>
            ) : (
              ""
            )}
            {selectedProject.links?.map((link) => (
              <div key={link} className="ProjectDetail-links">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: "#ffff" }}
                  href={link.startsWith("http") ? link : "http://" + link}
                >
                  {link}
                </a>
              </div>
            ))}
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
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={selectedProject.id}
      />
    </div>
  );
};
export default ProjectDetails;

export const ProjectDetailMob = ({ setShowProjectDetailsNotList }) => {
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(
    false
  );
  const { selectedProject } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const history = useHistory();

  const submitDelete = (id) => {
    doDeleteProject(id);
    setDisplayConfirmationModal(false);
    history.go(0);
    toast("Project deleted successfully");
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  useEffect(() => {
    if (currentUser?.uid === selectedProject.leader_id) {
      setCanModifyProject(true);
    } else {
      setCanModifyProject(false);
    }
  }, [currentUser?.uid, selectedProject.leader_id]);
  function deleteProj() {
    setDisplayConfirmationModal(true);
  }
  return (
    <div className="ProjectDetailMob-maindiv">
      <div className="ProjectDetailMob-headerdiv">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="ProjectDetailsmob-headerLeft"
        >
          <img
            alt=""
            src={
              selectedProject.leaderImg ||
              "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
            }
          ></img>
          <div className="ProjectDetailMob-imgdiv">
            <p
              className="text-capitalize"
              style={{ fontSize: "20px", fontWeight: "900" }}
            >
              {selectedProject.leader_name}
            </p>

            <a href={`tel:${selectedProject.contactNo}`}>
              <img
                style={{ height: "28px" }}
                src={Phoneicon}
                alt="phone-icon"
              ></img>
            </a>
            <a href={`mailto: ${selectedProject.leaderEmail}`}>
              <img style={{ height: "25px" }} src={Mail} alt="mail"></img>
            </a>
            {selectedProject.githubLink.length ? (
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noreferrer"
              >
                <img style={{ height: "28px" }} src={Github} alt="github"></img>
              </a>
            ) : (
              ""
            )}
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
      <div className="project-header">
        <h4 className="text-uppercase">{selectedProject.name}</h4>
      </div>
      <div className="contentsmob">
        <div className="contentsmob-subdiv">
          <p style={{ whiteSpace: "pre-line", lineHeight: "30px" }}>
            {selectedProject.desc}
          </p>

          {selectedProject.teamMembers?.length && (
            <div>
              <div className="team">
                <h4>TEAM MEMBERS</h4>
              </div>
              <div className="members">
                <ol style={{ display: "inline-block", paddingTop: "0" }}>
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
                style={{
                  marginTop: "4px",
                  marginRight: "10px",
                  width: "15px",
                  height: "15px",
                }}
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
                    style={{
                      marginRight: "10",
                      color: "#fff",
                    }}
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
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={selectedProject.id}
      />
    </div>
  );
};
