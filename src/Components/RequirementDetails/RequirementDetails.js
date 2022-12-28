import "./RequirementDetails.scss";
import Phoneicon from "../../assets/phone.svg";
import Mail from "../../assets/mail.svg";
import Github from "../../assets/github.svg";
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
          <a href={`tel:${selectedProject.contactNo}`}>
            <img
              src={Phoneicon}
              className="requirement_icon"
              alt="phone-icon"
            ></img>
          </a>
          <a href={`mailto: ${selectedProject.leaderEmail}`}>
            <img src={Mail} className="requirement_icon" alt="mail"></img>
          </a>
          {selectedProject.githubLink.length ? (
            <a
              href={selectedProject.githubLink}
              target="_blank"
              rel="noreferrer"
            >
              <img src={Github} className="requirement_icon" alt="github"></img>
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
