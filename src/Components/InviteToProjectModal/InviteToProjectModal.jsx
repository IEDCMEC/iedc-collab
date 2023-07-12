import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './InviteToProjectModal.scss';
import axios from 'axios';
import {
  createTheme,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { RiCloseLine } from 'react-icons/ri';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { useTheme } from '@emotion/react';
import { renderEmail } from 'react-html-email';
import { emailUrl } from '../../Utils/urls';
import triangle1 from '../../assets/triangle_1.svg';
import triangle2 from '../../assets/triangle_2.svg';
import triangle3 from '../../assets/triangle_3.svg';
import triangle4 from '../../assets/triangle_4.svg';
import '../JoinTeamModal/JoinTeamModal.scss';
import { sendInvite } from '../../Firebase/firebase';
import { ProjectContext } from '../../contexts/ProjectContext';
import Email from '../Email/Email';

function InviteToProjectModal({ user, selectedUser, ...props }) {
  const [project, setProject] = useState('');
  const { projects, fetchRequests } = useContext(ProjectContext);
  const [listProjects, setListProjects] = useState([]);
  const [message, setMessage] = useState('');
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              color: '#9E0000',
              border: '2px solid #9E0000',
              borderRadius: '10px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              color: '#9E0000',
              border: '2px solid #9E0000',
              borderRadius: '10px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              color: '#9E0000',
              border: '2px solid #9E0000',
              borderRadius: '10px',
            },
            minHeight: '150%',
          },
        },
      },
    },
  });
  async function handleSubmit() {
    const data = {
      sender: user.displayName,
      sender_id: user.uid,
      sender_email: user.email,
      sender_img: user.photoURL,
      reciever_email: selectedUser.email,
      receiver: selectedUser.name,
      reciever_img:
        selectedUser.photoURL ||
        'https://sabt.center/wp-content/uploads/2014/08/avatar-1.png',
      receiver_id: selectedUser._id,
      project_id: project.id,
      project: project.name,
      status: 'pending',
      message,
      createdAt: Date.now(),
    };
    await sendInvite(data).then(() => {
      toast('Invite Sent Successfully');
      fetchRequests();
    });
    await axios.post(emailUrl, {
      toEmail: selectedUser.email,
      subject: `Invite to join project ${project.name} from IEDC Collab`,
      // content: message,
      content: renderEmail(<Email request={data} />),
    });
  }

  const getWorks = async () => {
    // await getProjects().then(async function (snapshot) {
    //   let messageObject = snapshot.val();
    //   const result = Object.keys(messageObject).map((key) => ({
    //     ...messageObject[key],
    //     id: key,
    //   }));
    const temp = [];
    projects.forEach((projectName) => {
      if (projectName.leaderEmail === user.email) {
        if (
          !projectName.teamMembers?.some((x) => x === selectedUser.email) &&
          projectName?.isReq === true
        )
          temp.push(projectName);
      }
    });
    if (temp.length === 0) {
      temp.push({ name: 'No Projects Found' });
    }
    setListProjects(temp);
  };
  useEffect(() => {
    getWorks();
  }, []);
  return (
    <Dialog
      onClose={props.handleClose}
      open={props.open}
      fullWidth
      fullScreen={fullScreen}
      maxWidth="md"
      className="invite-to-project-modal"
    >
      <img src={triangle1} alt="" className="triangle_1" />
      <img src={triangle2} alt="" className="triangle_2" />
      <img src={triangle3} alt="" className="triangle_3" />
      <img src={triangle4} alt="" className="triangle_4" />
      <button
        type="button"
        className="close-button"
        onClick={props.handleClose}
      >
        <RiCloseLine size={38} color="#9e0000" />
      </button>
      <DialogContent className="invite-to-project-modal__body">
        <form onSubmit={handleSubmit}>
          <h1 className="join-team-modal__title">Invite To Project</h1>
          <div className="invite-project-name">
            <ThemeProvider theme={theme}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    fontWeight: '600',
                    fontSize: '17px',
                    fontFamily: 'Nunito',
                    lineHeight: '26px',
                    color: ' #9e0000',
                  }}
                >
                  Select Project
                </InputLabel>
                <Select
                  className="invite-project-name__label"
                  style={{
                    fontWeight: '600',
                    fontSize: '17px',
                    fontFamily: 'Nunito',
                    lineHeight: '26px',
                    color: ' #9e0000',
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Project"
                  value={project.name || ''}
                  onChange={(e) => {
                    setProject(
                      listProjects.find(
                        (projectName) => projectName.name === e.target.value
                      )
                    );
                  }}
                >
                  {listProjects.map((projectName) => (
                    <MenuItem
                      value={projectName.name}
                      key={projectName.id}
                      style={{
                        fontWeight: '600',
                        fontSize: '17px',
                        fontFamily: 'Nunito',
                        lineHeight: '26px',
                        color: ' #9e0000',
                      }}
                    >
                      {projectName.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ThemeProvider>
          </div>
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
              handleSubmit();
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

InviteToProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    uid: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
};

export default InviteToProjectModal;
