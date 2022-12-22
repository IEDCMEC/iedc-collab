import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody } from "react-bootstrap";
import "./JoinTeamModal.scss";
import bubble9 from "../../assets/bubble_9.svg";
import bubble10 from "../../assets/bubble_10.svg";
import bubble11 from "../../assets/bubble_11.svg";
import sendPaperPlane from "../../assets/sendPaperPlane.svg";
import closeButton from "../../assets/close.svg";
import axios from "axios";

const JoinTeamModal = (props) => {
  async function handleSubmit() {
    await axios.post(
      "https://w2e9j471i2.execute-api.ap-south-1.amazonaws.com/dev/send-email",
      {
        toEmail: ["jaisondennis080@gmail.com", "jaisondennis090@gmail.com"],
        subject: "Successsss.....",
        content: "This mail is sent from IEDC Collab as part of testing....",
      }
    );
  }
  return (
    <>
      <Modal {...props} size="xl" className="join-team-modal" centered>
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

        <div className="close-button" onClick={props.onHide}>
          <img
            alt="close"
            src={closeButton}
            onClick={props.onHide}
            className="close-button"
          />
        </div>

        <ModalBody className="join-team-modal__body">
          <h1 className="join-team-modal__title">Join Project Request</h1>
          <div className="message">
            <p className="message__label">Message</p>
            <textarea id="message__text"></textarea>
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
    </>
  );
};

export default JoinTeamModal;
