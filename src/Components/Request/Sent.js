import React from "react";
import "./Request.css";
import { useHistory } from "react-router-dom";

function Sent({ request }) {
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
              request.reciever_img ||
              "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
            }
            alt=""
          />

          <div className="req_profile_details">
            <div className="req_profile_details_h4">{request.receiver}</div>
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
            <div className="received_bpx_header_para_3">Pending</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sent;
