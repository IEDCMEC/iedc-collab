import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './JoinTeamModal.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RiCloseLine } from 'react-icons/ri';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { Dialog, DialogContent, useMediaQuery, useTheme } from '@mui/material';
import { renderEmail } from 'react-html-email';
import { ProjectContext } from '../../contexts/ProjectContext';
import { sendRequest } from '../../Firebase/firebase';
import bubble11 from '../../assets/bubble_11.svg';
import bubble10 from '../../assets/bubble_10.svg';
import bubble9 from '../../assets/bubble_9.svg';
import Email from '../Email/Email';
import { emailUrl } from '../../Utils/urls';

function JoinTeamModal({ user, project, ...props }) {
  const [message, setMessage] = useState('');
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const { fetchRequests } = useContext(ProjectContext);

  const onSubmit = async () => {
    const data = {
      sender: user.displayName,
      sender_id: user.uid,
      sender_img: user.photoURL,
      sender_email: user.email,
      receiver_email: project.leaderEmail,
      receiver: project.leader_name,
      receiver_id: project.leader_id,
      receiver_img: project.leaderImg,
      project_id: project.id,
      project: project.name,
      status: 'pending',
      message,
      createdAt: Date.now(),
    };
    await sendRequest(data).then(() => {
      fetchRequests();
      toast('Request Sent Successfully');
    });
    try {
      await axios.post(emailUrl, {
        toEmail: project.leaderEmail,
        subject: `Request to Join Team of ${project.name} from IEDC Collab`,
        content: renderEmail(<Email request={data} />),
      });
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <Dialog
      onClose={props.handleClose}
      open={props.open}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      className="join-team-modal"
    >
      <img src={bubble9} alt="" className="bubble_9" />
      <img src={bubble10} alt="" className="bubble_10" />
      <img src={bubble11} alt="" className="bubble_11" />
      <div className="rectangle-decoration top-rectangles">
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
      </div>
      <div className="rectangle-decoration bottom-rectangles">
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
        <div className="rectangle" />
      </div>
      <div
        className="close-button"
        onClick={props.handleClose}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            props.handleClose();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <RiCloseLine size={38} color="#9e0000" />
      </div>
      <DialogContent className="join-team-modal__body">
        <form onSubmit={onSubmit}>
          <h1 className="join-team-modal__title">Join Project Request</h1>
          <div className="message">
            <p className="message__label">Message</p>
            <textarea
              className="message__text"
              style={{ whiteSpace: 'pre-wrap' }}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button
            variant=""
            type="submit"
            className="btn"
            onClick={(event) => {
              event.preventDefault();
              onSubmit();
              props.handleClose();
            }}
          >
            <p>Send</p>
            <IoPaperPlaneSharp size={30} color="white" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

JoinTeamModal.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  project: PropTypes.shape({
    leaderEmail: PropTypes.string.isRequired,
    leader_name: PropTypes.string.isRequired,
    leader_id: PropTypes.string.isRequired,
    leaderImg: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default JoinTeamModal;
