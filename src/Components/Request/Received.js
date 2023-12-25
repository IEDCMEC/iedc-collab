import React, { useContext } from "react";
import "./Request.css";
import {
  acceptInvite,
  acceptRequest,
  declineRequest,
} from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { emailUrl } from "../../Utils/urls";
import { ProjectContext } from "../../contexts/ProjectContext";
import { HiUserAdd } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { renderEmail } from "react-html-email";
import ConfirmEmail from "../ConfirmEmail/ConfirmEmail";

function Received({ request }) {
  const history = useHistory();
  const { fetchRequestsRecieved } = useContext(ProjectContext);
  async function handleRequest() {
    await acceptRequest(request).then(() => {
      toast("Request Accepted");
      fetchRequestsRecieved()
      // .then(() => {
      //   axios.post(emailUrl, {
      //     toEmail: request.sender_email,
      //     subject: `Request Accepted by ${request.receiver} from IEDC Collab`,
      //     content: renderEmail(
      //       <ConfirmEmail request={request} status={"accepted"} />
      //     ),
      //   });
      // });
    });
  }
  async function handleInvite() {
    await acceptInvite(request).then(() => {
      toast("Invite Accepted");
      fetchRequestsRecieved()
      // .then(() => {
      //   axios.post(emailUrl, {
      //     toEmail: request.sender_email,
      //     subject: `Invite Accepted by ${request.receiver} from IEDC Collab`,
      //     content: renderEmail(
      //       <ConfirmEmail request={request} status={"accepted"} />
      //     ),
      //   });
      // });
    });
  }
  async function handleDeclineRequest() {
    if (request.type === "invite") {
      await declineRequest(request).then(() => {
        toast("Invite Declined");
        fetchRequestsRecieved()
        // .then(() => {
        //   axios.post(emailUrl, {
        //     toEmail: request.sender_email,
        //     subject: `Invite Declined by ${request.receiver} from IEDC Collab`,
        //     content: renderEmail(
        //       <ConfirmEmail request={request} status={"declined"} />
        //     ),
        //   });
        // });
      });
    }
    if (request.type === "request")
      await declineRequest(request).then(() => {
        toast("Request Declined");
        fetchRequestsRecieved()
        // .then(() => {
        //   axios.post(emailUrl, {
        //     toEmail: request.sender_email,
        //     subject: `Request Declined by ${request.receiver} from IEDC Collab`,
        //     content: renderEmail(
        //       <ConfirmEmail request={request} status={"declined"} />
        //     ),
        //   });
        // });
      });
  }
  return (
    <div className="received_sent_box">
      <div className="received_bpx_header">
        <div className="received_bpx_header_para">{request.project}</div>
        <div
          sx={{
            fontSize: "1rem",
            display: "flex",
          }}
          className="view_project_btn"
          variant="outlined"
          onClick={() => {
            history.push(`/projects/${request.project_id}`);
          }}
        >
          View Project
        </div>
      </div>
      <div className="req_profile_box">
        <div className="req_profile_box_1">
          <img
            className="req_profile_img"
            src={
              request.sender_img ||
              "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
            }
            alt=""
          />

          <div className="req_profile_details">
            <div className="req_profile_details_h4">{request.sender}</div>
            <div
              className="req_profile_details_p"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {request.message}
            </div>
          </div>
        </div>
        <div className="received_btns">
          {request.status === "accepted" && (
            <div className="received_bpx_header_para_2">Accepted</div>
          )}
          {request.status === "declined" && (
            <div className="received_bpx_header_para_1">Declined</div>
          )}
          {request.status === "pending" && (
            <>
              <div
                className="received_btn_accept"
                onClick={() => {
                  if (request.type === "request") {
                    handleRequest();
                  }
                  if (request.type === "invite") {
                    handleInvite();
                  }
                }}
              >
                <HiUserAdd size={25} />
                Accept
              </div>
              <div
                className="received_btn_decline"
                onClick={() => {
                  handleDeclineRequest();
                }}
              >
                <RiDeleteBin6Line size={25} />
                Decline
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Received;
