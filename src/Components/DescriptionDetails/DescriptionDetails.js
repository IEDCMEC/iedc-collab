import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import "./DescriptionDetails.scss";
import Phoneicon from "../../assets/phone.svg";
import Mail from "../../assets/mail.svg";
import Github from "../../assets/github.svg";
import Tag from '../../assets/tag.svg'
const DescriptionDetails = () => {
    const { selectedProject } = useContext(ProjectContext);

  return (
    <>
      <div className="description__container">
        <div className="description__title">PROJECT DESCRIPTION</div>
        <div className="description__content">
          {selectedProject.desc}
        </div>
      </div>
      <div className="description__other">
      
        {selectedProject.teamMembers?.length && (
          <div>
          <div className="description__other-team">TEAM MEMBERS</div>
             <div className="description__other-members">
             {selectedProject.teamMembers.map((member,index) => (
               <div className="description__other-member">{index+1}. {member}</div>
               ))}</div>
      </div>)}
      {selectedProject.links?.length ? (  
        <div>       
        <div className="description__other-reference">REFERENCES</div>
        
              <div
                className="ProjectDetail-linkdiv"
                style={{ display: "flex" }}
              ></div></div>
            ) : (
              ""
            )}
            <div className="description__other-references">
            {selectedProject.links?.map((link) => (
              
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={link.startsWith("http") ? link : "http://" + link}
                >
                  {link}
                </a>
            ))}</div>
             
        {selectedProject.tags?.length ? (
          <div className="description__other-tags"> <div className="description__other-tag"><img src={Tag} alt="tag"  /></div>
              <div className="description__tag">
                    {selectedProject.tags.map((tag) => (
                  <p>#{tag}</p>))}
              </div>
              </div>
            ) : (
              ""
            )}
              <div className="description-container__controls">
            <a
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
       
    </>
  );
};
export default DescriptionDetails;
