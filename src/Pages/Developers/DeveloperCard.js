import React from "react";
import "./Developers.scss";

const DeveloperCard = ({ user, handleClick }) => {

  return (
    <div
      data-aos="zoom-in"
      className="developer-card"
      key={user.id}
      style={{ cursor: "pointer" }}
      onClick={() => handleClick(user)}
    >
      <div className="developer-card-image">
        <img
          alt="Profile"
          src={
            user.profilePhoto ||
            "https://sabt.center/wp-content/uploads/2014/08/avatar-1.png"
          }
        />
      </div>
      <div>
        <h1 className="developer-card-name">{user.name}</h1>
        <div className="developer-card-email">{user.email}</div>
      </div>
    </div>
  );
};

export default DeveloperCard;
