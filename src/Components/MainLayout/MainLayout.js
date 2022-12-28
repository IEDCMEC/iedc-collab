import React from "react";
import "./MainLayout.scss";
import Nav from "../Navbar/Navbar";
const MainLayout = (props) => {
  return (
    <div>
      <Nav route={props.route} />
      <div className="layout__root">{props.children}</div>
    </div>
  );
};

export default MainLayout;
