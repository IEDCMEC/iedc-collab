import "./RequirementDetails.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
// import { GoMarkGithub } from "react-icons/go";
import { useContext, useEffect, useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { ProjectContext } from "../../contexts/ProjectContext";
import ProjectModal from "../ProjectModal/ProjectModal";
import DeleteConfirmation from "../DeleteConfirmationModal/DeleteConfirmation";
// import { useContext } from "react";

const RequirementDetails = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(
    false
  );

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  useEffect(() => {
    if (currentUser?.uid === props.selectedProject.leader_id) {
      setCanModifyProject(true);
    } else {
      setCanModifyProject(false);
    }
  }, [currentUser?.uid, props.selectedProject.leader_id]);
  function deleteProj() {
    setDisplayConfirmationModal(true);
  }
  return (
    <>
      <div className="requirement__container">
        <div className="description-details__headcontrols">
          {canModifyProject && (
            <RiDeleteBin7Line
              size={38}
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteProj();
              }}
              alt="delete project"
            />
          )}
          {canModifyProject && (
            <FiEdit
              size={36}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowNewProjectModal(true);
              }}
            />
          )}
        </div>
        <div className="requirement__content">
          {props.selectedProject?.req || "No Details Entered..."}
        </div>
      </div>
      <div className="requirement__other">
        {props.selectedProject?.hiring?.length === 0 ||
        !props.selectedProject.hiring ? (
          ""
        ) : (
          <>
            <div className="requirement__other-hiring">HIRING</div>
            <div className="requirement__other-skills">
              {props.selectedProject?.hiring?.map((role, index) => {
                return (
                  <div className="requirement__other-skill" key={index}>
                    o {role}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="requirement-container__controls">
          {currentUser ? (
            <a
              href={`tel:${props.selectedProject.contactNo}`}
              className="description__tag_phone_mobile"
            >
              <FaPhoneAlt
                color="white"
                size={40}
                style={{
                  backgroundColor: "#9e0000",
                  borderRadius: "50%",
                  padding: "8px",
                }}
              />
            </a>
          ) : (
            ""
          )}
          {currentUser ? (
            <a href={`mailto: ${props.selectedProject.leaderEmail}`}>
              <IoMdMail
                color="#9e0000"
                size={49}
                style={{ marginTop: "3px" }}
              />
            </a>
          ) : (
            ""
          )}

          {/* {props.selectedProject.githubLink.length ? (
            <a
              href={props.selectedProject.githubLink}
              target="_blank"
              rel="noreferrer"
            >
              <GoMarkGithub color="#9e0000" size={40} />
            </a>
          ) : (
            ""
          )} */}
        </div>
      </div>
      <ProjectModal
        show={showNewProjectModal}
        onHide={() => setShowNewProjectModal(false)}
        project={props.selectedProject}
        setVariable={props.setVariable}
        variable={props.variable}
      />
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        hideModal={hideConfirmationModal}
        id={props.selectedProject.id}
      />
    </>
  );
};
export default RequirementDetails;
