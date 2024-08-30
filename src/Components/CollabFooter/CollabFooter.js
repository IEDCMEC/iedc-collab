

import React from 'react';
import "./CollabFooter.scss";
import bubble6 from "../../assets/bubble_6.svg";
import bubble7 from "../../assets/bubble_7.svg";

const CollabFooter = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer__main">
      <img src={bubble6} alt="" className="bubble_6" />
      <div className="footer__content">
        <div className="footer__link">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScQG7kKFziJ-Lg2h5tK38eOb-erKSWjnr4sBg6k0tUYoS8A-A/viewform" target="_blank" rel="noopener noreferrer">
            Facing issues? Let us know
          </a>
        </div>
        <div className="footer__message">
          Copyright © {year} IEDC MEC
        </div>
        
      </div>
      <img src={bubble7} alt="" className="bubble_7" />
    </div>
  );
};

export default CollabFooter;
