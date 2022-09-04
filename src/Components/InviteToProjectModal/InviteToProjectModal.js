import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ModalBody} from "react-bootstrap";


import './InviteToProjectModal.scss'

import triangle_1 from '../../assets/triangle_1.svg'
import triangle_2 from '../../assets/triangle_2.svg'
import triangle_3 from '../../assets/triangle_3.svg'
import triangle_4 from '../../assets/triangle_4.svg'
import sendPaperPlane from "../../assets/sendPaperPlane.svg"
import closeButton from "../../assets/close.svg";

const InviteToProjectModal = () => {
    return (<Modal.Dialog size="xl" className="invite-to-project-modal">
        <img src={triangle_1} alt="" className="triangle_1"/>
        <img src={triangle_2} alt="" className="triangle_2"/>
        <img src={triangle_3} alt="" className="triangle_3"/>
        <img src={triangle_4} alt="" className="triangle_4"/>

        <div className="close-button">
            <img alt="close" src={closeButton} className="close-button"/>
        </div>

        <ModalBody className="invite-to-project-modal__body">
            <h1 className="invite-to-project-modal__title">Invite To Project</h1>
            <div className="invite-project-name">
                <p className="invite-project-name__label">Project Name</p>
                <input id="invite-project-name__text" type="text"/>
            </div>
            <div className="invite-message">
                <p className="invite-message__label">Message</p>
                <textarea id="invite-message__text"></textarea>
            </div>
            <Button variant="" type="submit" className="btn">
                <p>Send</p>
                <img src={sendPaperPlane} alt="" className=""/>
            </Button>
        </ModalBody>
    </Modal.Dialog>);
}

export default InviteToProjectModal;