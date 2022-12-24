import React from "react";
import "./Request.css";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function Sent({request}) {
  const history = useHistory();
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
          onClick={()=>{
            history.push(`/projects/${request.project_id}`)
          }}
        >
          View Project
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
            {request.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sent;
