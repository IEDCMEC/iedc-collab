import React from 'react';
import './Footer.scss';
import { HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import bubble6 from '../../assets/bubble_6.svg';
import bubble7 from '../../assets/bubble_7.svg';

function Footer() {
  return (
    <div className="footer_main">
      <img src={bubble6} alt="" className="bubble_6" />
      <div className="footer__content">
        <div className="footer_icons">
          <a href="mailto: iedc@mec.ac.in">
            <HiMail color="white" size={37} />
          </a>
          <a href="https://www.linkedin.com/company/iedcmec/">
            <FaLinkedin color="white" size={28} />
          </a>
          <a href="https://github.com/IEDCMEC">
            <FaGithub color="white" size={28} />
          </a>
        </div>
        <div className="footer__made">Made with ❤️ IEDC MEC 2022</div>
      </div>
      <img src={bubble7} alt="" className="bubble_7" />
    </div>
  );
}
export default Footer;
