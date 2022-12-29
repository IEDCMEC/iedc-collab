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

function Received({ request }) {
  const history = useHistory();
  const { fetchRequestsRecieved } = useContext(ProjectContext);
  async function handleRequest() {
    await acceptRequest(request);
    axios
      .post(emailUrl, {
        toEmail: request.sender_email,
        subject: `Request Accepted from IEDC Collab`,
        content: `${request.receiver} accepted the request for ${request.project}.`,
      })
      .then(() => {
        fetchRequestsRecieved();
        toast("Request Accepted");
      });
  }
  async function handleInvite() {
    await acceptInvite(request);
    axios
      .post(emailUrl, {
        toEmail: request.sender_email,
        subject: `Invite Accepted by ${request.receiver} from IEDC Collab`,
        content: `${request.receiver} accepted the invite for ${request.project}.`,
      })
      .then(() => {
        fetchRequestsRecieved();
        toast("Invite Accepted");
      });
  }
  async function handleDeclineRequest() {
    await declineRequest(request);
    if (request.type === "invite") {
      await axios

        .post(emailUrl, {
          toEmail: request.sender_email,
          subject: `Invite Declined from IEDC Collab`,
          content: `${request.receiver} declined the invite for ${request.project}`,
        })
        .then(() => {
          fetchRequestsRecieved();
          toast("Invite Declined");
        });
    }
    if (request.type === "request")
      await axios

        .post(emailUrl, {
          toEmail: request.sender_email,
          subject: `Request Declined from IEDC Collab`,
          content: `${request.receiver} declined the request for ${request.project}.`,
        })
        .then(() => {
          fetchRequestsRecieved();
          toast("Request Declined");
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
            <div className="req_profile_details_p">{request.message}</div>
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
