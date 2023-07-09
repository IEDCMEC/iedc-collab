import React from 'react';
import './DiscussionDetails.scss';

function DiscussionDetails() {
  return (
    <div className="ideas__container">
      <div className="ideas__box">
        <div className="ideas__animation">
          <div className="ideas__one ideas__spin-one" />
          <div className="ideas__two ideas__spin-two" />
          <div className="ideas__three ideas__spin-one" />
        </div>
        <h1 style={{ fontWeight: '800' }}>Coming Soon....</h1>
      </div>
    </div>
  );
}
export default DiscussionDetails;
