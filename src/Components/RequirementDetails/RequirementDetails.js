import "./RequirementDetails.scss";
import Phoneicon from "../../assets/phone.svg";
import Mail from "../../assets/mail.svg";
import Github from "../../assets/github.svg";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useContext } from "react";

const RequirementDetails = () => {
    const { selectedProject } = useContext(ProjectContext);
  return (
    <>
      <div className="requirement__container">
        <div className="requirement__title">PROJECT REQUIREMENTS</div>
        <div className="requirement__content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
          purus varius gravida aliquam elementum molestie. Ipsum aliquam,
          pretium, et fames tempus, faucibus risus, ultricies tincidunt. A
          rutrum urna elementum sit proin neque ultrices interdum ac. Tellus
          duis quisque vestibulum amet, diam sapien habitasse facilisis. Orci
          est fringilla at pellentesque.Tellus duis quisque vestibulum amet,
          diam sapien habitasse facilisis. Orci est fringilla at pellentesque.
        </div>
      </div>
      <div className="requirement__other">
            <div className="requirement__other-hiring">HIRING</div>
            <div className="requirement__other-skills">
                <div className="requirement__other-skill">
                o React JS Developer  - Description
                </div>
                <div className="requirement__other-skill">
                o C++ Programmer
                </div>
                <div className="requirement__other-skill">
                o SQL Programmer
                </div>
            </div>
        <div className="requirement-container__controls">
          <a href={`tel:${selectedProject.contactNo}`}>
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
    </>
  );
};
export default RequirementDetails;
