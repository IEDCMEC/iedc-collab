import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import "./DescriptionDetails.scss";
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
        <div className="description__other-team">TEAM MEMBERS</div>
        {selectedProject.teamMembers?.length && (
                  <div className="description__other-members">
                    <ol>
                      {selectedProject.teamMembers.map((member) => (
                        <li key={member}>{member}</li>
                      ))}
                    </ol>
                </div>
            )}
        <div className="description__other-team">REFERENCES</div>
        <div className="description__other-references"><a href="www.tata.com" target='_blank'>www.tata.com</a></div>
        <div className="description__other-tags"> <div className="description__other-tag"><img src={Tag} alt="tag"  /></div>
        {selectedProject.tags?.length ? (
              <div className="description__tag">
                    {selectedProject.tags.map((tag) => (
                  <p>#{tag}</p>))}
              </div>
            ) : (
              ""
            )}
      </div>
      </div>
       
    </>
  );
};
export default DescriptionDetails;
