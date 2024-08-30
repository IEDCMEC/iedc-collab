import Button from "react-bootstrap/Button";
import "./RequestAcceptedModal.scss";
import bubble9 from "../../assets/bubble_9.svg";
import bubble10 from "../../assets/bubble_10.svg";
import bubble11 from "../../assets/bubble_11.svg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    acceptInvite,
    acceptRequest,
  } from "../../Firebase/firebase";
import { toast } from "react-toastify";
import { ProjectContext } from "../../contexts/ProjectContext";
import { RiCloseLine } from "react-icons/ri";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { Dialog, DialogContent, useMediaQuery, useTheme } from "@mui/material";
// import { renderEmail } from "react-html-email";
import Email from "../Email/Email";
import { emailUrl } from "../../Utils/urls";
//import ConfirmEmail from "../ConfirmEmail/ConfirmEmail";

const RequestAcceptedModal = ({request, ...props }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const { fetchRequestsRecieved } = useContext(ProjectContext);

  const onSubmit = async () => {
    if(request.type === "request"){
        await acceptRequest(request).then(() => {
            toast("Request Accepted");
             fetchRequestsRecieved(); 
            });
    }
    if(request.type === "invite"){
        await acceptInvite({...request,message: message}).then(() => {
            toast("Request Accepted");
             fetchRequestsRecieved()
    })
   
    // try {
    //   await axios.post(
    //     emailUrl,
    //     {
    //       toEmail: project.leaderEmail,
    //       subject: `Request to Join Team of ${project.name} from IEDC Collab`,
    //       content: renderEmail(<Email request={data} />),
    //     }
    //   );
    // } catch (err) {
    //   // console.log(err);
    // }
  }};
  return (
    <>
      <Dialog
        onClose={props.handleClose}
        open={props.open}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="md"
        className="join-team-modal"
      >
        <img src={bubble9} alt="" className="bubble_9" />
        <img src={bubble10} alt="" className="bubble_10" />
        <img src={bubble11} alt="" className="bubble_11" />
        <div className="rectangle-decoration top-rectangles">
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
        </div>
        <div className="rectangle-decoration bottom-rectangles">
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
        </div>
        <div className="close-button" onClick={props.onClose}>
          <RiCloseLine size={38} color="#9e0000" />
        </div>
        <DialogContent className="join-team-modal__body">
          <form onSubmit={onSubmit}>{/**/}
            <h1 className="join-team-modal__title">Say hi{request.type}</h1>
            <div className="message">
              <p className="message__label">Message</p>
              <textarea
                className="message__text"
                style={{ whiteSpace: "pre-wrap" }}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <Button
              variant=""
              type="submit"
              className="btn"
              onClick={(event) => {
                event.preventDefault();
                onSubmit();
                props.onClose();
              }}
            >
              <p>Send</p>
              <IoPaperPlaneSharp size={30} color="white" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestAcceptedModal;
