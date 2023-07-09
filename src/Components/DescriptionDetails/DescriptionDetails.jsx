import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoMdMail } from 'react-icons/io';
import { IoPricetagsOutline } from 'react-icons/io5';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FaGithub, FaPhoneAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { ProjectContext } from '../../contexts/ProjectContext';
import DeleteConfirmation from '../DeleteConfirmationModal/DeleteConfirmation';
import ProjectModal from '../ProjectModal/ProjectModal';
import { doDeleteProject } from '../../Firebase/firebase';
import { AuthContext } from '../../Firebase/Auth/Auth';
import { mainUrl } from '../../Utils/urls';
import './DescriptionDetails.scss';

function DescriptionDetails(props) {
  const { fetchData, devHash } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(
    false
  );

  const { selectedProject, variable, setVariable } = props;

  const history = useHistory();
  const submitDelete = (id) => {
    doDeleteProject(id, () => {
      toast('Project deleted successfully');
      fetchData();
    });
    setDisplayConfirmationModal(false);
    history.go(0);
  };
  // create a map of developers with their email as key and name as value

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
    <>
      <div className="description__container">
        <div className="description-details__headcontrols">
          {canModifyProject && (
            <RiDeleteBin7Line
              size={38}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                deleteProj();
              }}
              alt="delete project"
            />
          )}
          {canModifyProject && (
            <FiEdit
              size={36}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowNewProjectModal(true);
              }}
            />
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
              {selectedProject.teamMembers.map((member, index) =>
                devHash[member]?.id ? (
                  <div className="description__other-member" key={member}>
                    {index + 1}
                    .
                    <div style={{ width: '6px' }} />
                    <a
                      href={`${mainUrl}/developers/${devHash[member].id}`}
                      style={{
                        color: '#263238',
                        textDecoration: 'underline',
                      }}
                    >
                      {devHash[member].name}
                    </a>
                  </div>
                ) : (
                  <a href={`mailto:${member}`} key={member}>
                    <div className="description__other-member">
                      {index + 1}.{member}
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        )}
        {selectedProject.skills?.length && (
          <div>
            <div className="description__other-team">TECH STACKS</div>
            <div className="description__other-members">
              {selectedProject.skills?.map((skill, index) => (
                <div className="description__other-member" key={skill}>
                  {index + 1}
                  {' . '}
                  {skill}
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
              style={{ display: 'flex' }}
            />
          </div>
        ) : (
          ''
        )}
        <div className="description__other-references">
          {selectedProject.links?.map((link) => (
            <a
              rel="noopener noreferrer"
              target="_blank"
              key={link}
              href={link.startsWith('http') ? link : `http://${link}`}
            >
              {link}
            </a>
          ))}
        </div>

        {selectedProject.tags?.length ? (
          <div className="description__other-tags">
            {' '}
            <div className="description__other-tag">
              <IoPricetagsOutline size={26} />
            </div>
            <div className="description__tag">
              {selectedProject.tags.map((tag) => (
                <p key={tag}>#{tag}</p>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
        {currentUser ? (
          <div className="description__tag_phone">
            <i className="fa fa-phone" />
            <span className="ml-2">{selectedProject.contactNo}</span>
          </div>
        ) : (
          ''
        )}

        <div className="description-container__controls">
          {currentUser ? (
            <a
              href={`tel:${selectedProject.contactNo}`}
              className="description__tag_phone_mobile"
            >
              <FaPhoneAlt
                color="white"
                size={40}
                style={{
                  backgroundColor: '#9e0000',
                  borderRadius: '50%',
                  padding: '8px',
                }}
              />
            </a>
          ) : (
            ''
          )}

          {currentUser ? (
            <a href={`mailto: ${selectedProject.leaderEmail}`}>
              <IoMdMail
                color="#9e0000"
                size={49}
                style={{ marginTop: '3px' }}
              />
            </a>
          ) : (
            ''
          )}

          {selectedProject.githubLink.length ? (
            <a
              href={selectedProject.githubLink}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub color="#9e0000" size={40} />
            </a>
          ) : (
            ''
          )}
        </div>

        <ProjectModal
          show={showNewProjectModal}
          onHide={() => setShowNewProjectModal(false)}
          project={selectedProject}
          setVariable={setVariable}
          variable={variable}
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
}

DescriptionDetails.propTypes = {
  selectedProject: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    teamMembers: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired,
    leaderEmail: PropTypes.string.isRequired,
    contactNo: PropTypes.string.isRequired,
    leader_id: PropTypes.string.isRequired,
  }).isRequired,
  variable: PropTypes.string.isRequired,
  setVariable: PropTypes.func.isRequired,
};

export default DescriptionDetails;
