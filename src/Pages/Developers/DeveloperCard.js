import React from "react";
import "./Developers.scss";

const DeveloperCard = ({ user, handleClick }) => {
  const getLinkedinUsername = (url) => {
    const urlArray = url.split("/");
    if (urlArray[urlArray.length - 1] === "") {
      return urlArray[urlArray.length - 2];
    }
    return urlArray[urlArray.length - 1];
  };
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
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}>
        <h1 className="developer-card-name">{user.name.toLowerCase()}</h1>
        <div className="developer-card-email">
          {user.linkedin ? "@" + getLinkedinUsername(user.linkedin) : null}
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
