import React from "react";
import "./Request.css";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function Sent({request}) {
  const history = useHistory();
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
          onClick={()=>{
            history.push(`/projects/${request.project_id}`)
          }}
        >
          View Project
        </div>
      </div>
      <div className="req_profile_box">
        <div>
        <img
          className="req_profile_img"
          src={request.reciever_img||"https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"}
          alt=""
        />
        </div>
        <div className="req_profile_details">
          <div className="req_profile_details_h4">{request.receiver}</div>
          <div className="req_profile_details_p">
            {request.message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sent;
