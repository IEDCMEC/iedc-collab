import React from "react";
import "./SuspenseLoader.scss";
const SuspenseLoader = () => {
  return (
    <div className="loader__enwrapper">
      <div className="loader__suspense_container">
        <span className="one"></span>
        <span className="two"></span>
        <span className="three"></span>
        <span className="four"></span>
      </div>
    </div>
  );
};

export default SuspenseLoader;
