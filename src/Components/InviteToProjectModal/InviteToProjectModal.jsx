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
    projects.forEach((project, index) => {
      if (project.leaderEmail === user.email) {
        if (
          !project.teamMembers?.some((x) => x === selectedUser.email) &&
          project?.isReq === true
        )
          temp.push(project);
      }
    });
    if (temp.length === 0) {
      temp.push({ name: 'No Projects Found' });
    }
    setListProjects(temp);
  };
  useEffect(() => {
    getWorks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="close-button" onClick={props.onClose}>
        <RiCloseLine size={38} color="#9e0000" />
      </div>
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
                        (project) => project.name === e.target.value
                      )
                    );
                  }}
                >
                  {listProjects.map((project, index) => (
                    <MenuItem
                      value={project.name}
                      key={index}
                      style={{
                        fontWeight: '600',
                        fontSize: '17px',
                        fontFamily: 'Nunito',
                        lineHeight: '26px',
                        color: ' #9e0000',
                      }}
                    >
                      {project.name}
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
              props.onClose();
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
  onClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default InviteToProjectModal;
