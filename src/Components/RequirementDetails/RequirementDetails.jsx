import React, { useContext, useEffect, useState } from 'react';
import './RequirementDetails.scss';
import { FaGithub, FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { doDeleteProject } from '../../Firebase/firebase';
import { AuthContext } from '../../Firebase/Auth/Auth';
import { ProjectContext } from '../../contexts/ProjectContext';
import ProjectModal from '../ProjectModal/ProjectModal';
import DeleteConfirmation from '../DeleteConfirmationModal/DeleteConfirmation';

function RequirementDetails(props) {
  const { fetchData } = useContext(ProjectContext);
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
      <div className="requirement__container">
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
        <div className="requirement__title">PROJECT REQUIREMENTS</div>
        <div className="requirement__content">
          {selectedProject?.req || 'No Details Entered...'}
        </div>
      </div>
      <div className="requirement__other">
        {selectedProject?.hiring?.length === 0 || !selectedProject.hiring ? (
          ''
        ) : (
          <>
            <div className="requirement__other-hiring">HIRING</div>
            <div className="requirement__other-skills">
              {selectedProject?.hiring?.map((role) => (
                <div className="requirement__other-skill" key={role}>
                  {`o ${role}`}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="requirement-container__controls">
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
    </>
  );
}

RequirementDetails.propTypes = {
  selectedProject: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    req: PropTypes.string,
    leader_id: PropTypes.string,
    leaderEmail: PropTypes.string,
    contactNo: PropTypes.string,
    githubLink: PropTypes.string,
    hiring: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  variable: PropTypes.string.isRequired,
  setVariable: PropTypes.func.isRequired,
};

export default RequirementDetails;
