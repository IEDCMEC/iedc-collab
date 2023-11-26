import React from "react";
import "./Jobs.scss";

const JobsCard = ({ user, handleClick }) => {
  return (
    <div
      data-aos="zoom-in"
      className="job-card"
      key={user.id}
      style={{ cursor: "pointer" }}
      onClick={() => handleClick(user)}
    >
      <div className="job-card-image">
        <img
          alt="Profile"
          src={
            user.profilePhoto ||
            "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
          }
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <h1 className="job-card-name">Frontend Developer Internship</h1>
        <h2 className="job-card-place">Kochi | Kerala</h2>
      </div>
    </div>
  );
};

export default JobsCard;
