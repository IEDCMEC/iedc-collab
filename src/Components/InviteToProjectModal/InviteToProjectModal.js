import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody } from "react-bootstrap";

import "./InviteToProjectModal.scss";

import triangle_1 from "../../assets/triangle_1.svg";
import triangle_2 from "../../assets/triangle_2.svg";
import triangle_3 from "../../assets/triangle_3.svg";
import triangle_4 from "../../assets/triangle_4.svg";
import sendPaperPlane from "../../assets/sendPaperPlane.svg";
import closeButton from "../../assets/close.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProjects } from "../../Firebase/firebase";
import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import { sendInvite } from "../../Firebase/firebase";

const InviteToProjectModal = ({ user, selectedUser, ...props }) => {
  console.log(selectedUser);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              borderRadius: "10px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              borderRadius: "10px",
            },
            minHeight: "150%",
          },
        },
      },
    },
  });
  async function handleSubmit() {
    try {
      await axios.post(
        "https://w2e9j471i2.execute-api.ap-south-1.amazonaws.com/dev/send-email",
        {
          toEmail: selectedUser.email,
          subject: `Invite to ${project.name} from IEDC Collab`,
          content: message,
        }
      );
    } catch (err) {
      console.log(err);
    }

    let data = {
      sender: user.displayName,
      sender_id: user.uid,
      receiver: selectedUser.name,
      receiver_id: selectedUser._id,
      project_id: project.id,
      project: project.name,
      status: "pending",
      message: message,
      createdAt: Date.now(),
    };
    await sendInvite(data);
  }

  const getWorks = async () => {
    await getProjects().then(async function (snapshot) {
      let messageObject = snapshot.val();
      const result = Object.keys(messageObject).map((key) => ({
        ...messageObject[key],
        id: key,
      }));
      setProjects(result);
      setLoading(false);
    });
  };
  useEffect(() => {
    getWorks();
  }, [projects]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Modal {...props} size="xl" centered className="invite-to-project-modal">
      <img src={triangle_1} alt="" className="triangle_1" />
      <img src={triangle_2} alt="" className="triangle_2" />
      <img src={triangle_3} alt="" className="triangle_3" />
      <img src={triangle_4} alt="" className="triangle_4" />

      <div className="close-button" onClick={props.onHide}>
        <img
          alt="close"
          src={closeButton}
          onClick={props.onHide}
          className="close-button"
        />
      </div>

      <ModalBody className="invite-to-project-modal__body">
        <h1 className="invite-to-project-modal__title">Invite To Project</h1>
        <div className="invite-project-name">
          {/* <p className="invite-project-name__label">Project Name</p> */}
          {/* <input id="invite-project-name__text" type="text" /> */}
          <ThemeProvider theme={theme}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  fontWeight: "400",
                  fontSize: "17px",
                  lineHeight: "26px",
                  color: " #622308",
                }}
              >
                Select Project
              </InputLabel>
              <Select
                style={{
                  fontWeight: "400",
                  width: "100%",
                  fontSize: "17px",
                  lineHeight: "26px",
                  color: " #622308",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Project"
                value={project.name || ""}
                onChange={(e) => {
                  setProject(
                    projects.find((project) => project.name === e.target.value)
                  );
                }}
              >
                {projects.map((project, index) => {
                  return (
                    <MenuItem value={project.name} key={index}>
                      {project.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </ThemeProvider>
        </div>
        <div className="invite-message">
          <p className="invite-message__label">Message</p>
          <textarea
            id="invite-message__text"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <Button
          variant=""
          type="submit"
          className="btn"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
            props.onHide();
          }}
        >
          <p>Send</p>
          <img src={sendPaperPlane} alt="" className="" />
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default InviteToProjectModal;
