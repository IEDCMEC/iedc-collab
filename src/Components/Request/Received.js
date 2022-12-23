import React, { useEffect, useState } from "react";
import "./Request.css"
import accept_icon from "../../assets/accepticon.svg";
import decline_icon from "../../assets/declineicon.svg";
import { Button } from "@mui/material";
import {acceptRequest, getRequests} from "../../Firebase/firebase"
import { useContext } from "react";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { ControlCameraSharp } from "@mui/icons-material";

function Received({request}) {


  return (
    <div className="received_sent_box">
      <div className="received_bpx_header">
        <p>{request.project}</p>
        <Button
          sx={{
            fontSize: "1rem",
            display: "flex",
          }}
          variant="outlined"
        >
          View Projects
        </Button>
      </div>
      <div className="req_profile_box">
        <img
          className="req_profile_img"
          src="https://vpnoverview.com/wp-content/uploads/what-is-a-hacker-what-is-hacking-featured-800x400.png"
          alt=""
        />
        <div className="req_profile_details">
          <h4>{request.sender}</h4>
          <p>
            {/* Invite Message - Add a default Message if user doesnot customize it */}
            {request.message}
          </p>
        </div>
      </div>

      <div className="received_btns">
        <button className="received_btn_accept" onClick = {()=>acceptRequest(request)}>
          <img src={accept_icon} alt="" />
          Accept
        </button>
        <button className="received_btn_decline">
          <img src={decline_icon} alt="" />
          Decline
        </button>
      </div>
    </div>
  );
}

export default Received;
