import React, { useEffect, useState } from "react";
import "./Request.css";
import accept_icon from "../../assets/accepticon.svg";
import decline_icon from "../../assets/declineicon.svg";
import { Button } from "@mui/material";
import { acceptRequest, getRequests } from "../../Firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { ControlCameraSharp } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

function Received() {
  const history = useHistory();

  return (
    <div className="received_sent_box">
      <div className="received_bpx_header">
        <div className="received_bpx_header_para">Project Name</div>
        <div
          sx={{
            fontSize: "1rem",
            display: "flex",
          }}
          className="view_project_btn"
          variant="outlined"
          onClick={() => {
            history.push(`/projects/`);
          }}
        >
          View Project
        </div>
      </div>
      <div className="req_profile_box">
        <div>
          <img
            className="req_profile_img"
            src="https://vpnoverview.com/wp-content/uploads/what-is-a-hacker-what-is-hacking-featured-800x400.png"
            alt=""
          />
        </div>
        <div className="req_profile_details">
          <div className="req_profile_details_h4">Guy Hawkins</div>
          <div className="req_profile_details_p">
            This Message can be customized..
          </div>
        </div>
      </div>

      <div className="received_btns">
        <div className="received_btn_accept" onClick={() => acceptRequest()}>
          <img src={accept_icon} alt="" />
          Accept
        </div>
        <div className="received_btn_decline">
          <img src={decline_icon} alt="" />
          Decline
        </div>
      </div>
    </div>
  );
}

export default Received;
