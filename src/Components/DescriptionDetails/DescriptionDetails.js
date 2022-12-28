import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import "./DescriptionDetails.scss";
import Phoneicon from "../../assets/phone.svg";
import Mail from "../../assets/mail.svg";
import Github from "../../assets/github.svg";
import Tag from "../../assets/tag.svg";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { doDeleteProject } from "../../Firebase/firebase";
import Bin from "../../assets/bin.svg";
import Edit from "../../assets/edit.svg";
import ProjectModal from "../ProjectModal/ProjectModal";
import { toast } from "react-toastify";
import DeleteConfirmation from "../DeleteConfirmationModal/DeleteConfirmation";

const DescriptionDetails = ({ selectedProject }) => {
  const { fetchData } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(
    false
  );
  const history = useHistory();
  const submitDelete = (id) => {
    doDeleteProject(id, () => {
      toast("Project deleted successfully");
      fetchData();
    });
    setDisplayConfirmationModal(false);
    history.go(0);
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
    <>
      <div className="description__container">
        <div className="description-details__headcontrols">
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
        <div className="description__title">PROJECT DESCRIPTION</div>
        <div className="description__content">{selectedProject.desc}</div>
      </div>
      <div className="description__other">
        {selectedProject.teamMembers?.length && (
          <div>
            <div className="description__other-team">TEAM MEMBERS</div>
            <div className="description__other-members">
              {selectedProject.teamMembers.map((member, index) => (
                <div className="description__other-member" key={index}>
                  {index + 1}. {member}
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedProject.links?.length ? (
          <div>
            <div className="description__other-reference">REFERENCES</div>

            <div
              className="ProjectDetail-linkdiv"
              style={{ display: "flex" }}
            ></div>
          </div>
        ) : (
          ""
        )}
        <div className="description__other-references">
          {selectedProject.links?.map((link, index) => (
            <a
              rel="noopener noreferrer"
              target="_blank"
              key={index}
              href={link.startsWith("http") ? link : "http://" + link}
            >
              {link}
            </a>
          ))}
        </div>

        {selectedProject.tags?.length ? (
          <div className="description__other-tags">
            {" "}
            <div className="description__other-tag">
              <img src={Tag} alt="tag" />
            </div>
            <div className="description__tag">
              {selectedProject.tags.map((tag, index) => (
                <p key={index}>#{tag}</p>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="description__tag_phone">
          <i className="fa fa-phone"></i>
          <span className="ml-2">{selectedProject.contactNo}</span>
        </div>
        <div className="description-container__controls">
          <div>
            <a
              href={`tel:${selectedProject.contactNo}`}
              className="description__tag_phone_mobile"
            >
              <img src={Phoneicon} alt="phone-icon"></img>
            </a>
          </div>
          <div>
            <a href={`mailto: ${selectedProject.leaderEmail}`}>
              <img src={Mail} alt="mail"></img>
            </a>
          </div>
          {selectedProject.githubLink.length ? (
            <div>
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noreferrer"
              >
                <img src={Github} alt="github"></img>
              </a>
            </div>
          ) : (
            ""
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
    </>
  );
};
export default DescriptionDetails;
