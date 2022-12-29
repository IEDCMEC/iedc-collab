import "./RequirementDetails.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { GoMarkGithub } from "react-icons/go";
// import { ProjectContext } from "../../contexts/ProjectContext";
// import { useContext } from "react";

const RequirementDetails = ({ selectedProject }) => {
  return (
    <>
      <div className="requirement__container">
        <div className="requirement__title">PROJECT REQUIREMENTS</div>
        <div className="requirement__content">
          {selectedProject?.req || "No Details Entered..."}
        </div>
      </div>
      <div className="requirement__other">
        {selectedProject?.hiring?.length === 0 || !selectedProject.hiring ? (
          ""
        ) : (
          <>
            <div className="requirement__other-hiring">HIRING</div>
            <div className="requirement__other-skills">
              {selectedProject?.hiring?.map((role, index) => {
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
          <a
            href={`tel:${selectedProject.contactNo}`}
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
          <a href={`mailto: ${selectedProject.leaderEmail}`}>
            <IoMdMail color="#9e0000" size={49} style={{ marginTop: "3px" }} />
          </a>
          {selectedProject.githubLink.length ? (
            <a
              href={selectedProject.githubLink}
              target="_blank"
              rel="noreferrer"
            >
              <GoMarkGithub color="#9e0000" size={40} />
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default RequirementDetails;
