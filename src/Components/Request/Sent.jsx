import React from 'react';
import PropTypes from 'prop-types';
import './Request.scss';
import { useHistory } from 'react-router-dom';

function Sent({ request }) {
  const history = useHistory();
  return (
    <div className="received_sent_box">
      <div className="received_bpx_header">
        <div className="received_bpx_header_para">{request.project}</div>
        <button
          type="button"
          style={{
            fontSize: '1rem',
            display: 'flex',
          }}
          className="view_project_btn"
          onClick={() => {
            history.push(`/projects/${request.project_id}`);
          }}
        >
          View Project
        </button>
      </div>
      <div className="req_profile_box">
        <div className="req_profile_box_1">
          <img
            className="req_profile_img"
            src={
              request.reciever_img
                ? request.reciever_img
                : 'https://sabt.center/wp-content/uploads/2014/08/avatar-1.png'
            }
            alt=""
          />

          <div className="req_profile_details">
            <div className="req_profile_details_h4">{request.receiver}</div>
            <div
              className="req_profile_details_p"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {request.message}
            </div>
          </div>
        </div>

        <div className="received_btns">
          {request.status === 'accepted' && (
            <div className="received_bpx_header_para_2">Accepted</div>
          )}
          {request.status === 'declined' && (
            <div className="received_bpx_header_para_1">Declined</div>
          )}
          {request.status === 'pending' && (
            <div className="received_bpx_header_para_3">Pending</div>
          )}
        </div>
      </div>
    </div>
  );
}

Sent.propTypes = {
  request: PropTypes.shape({
    project: PropTypes.string,
    project_id: PropTypes.number,
    reciever_img: PropTypes.string,
    receiver: PropTypes.string,
    message: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default Sent;
