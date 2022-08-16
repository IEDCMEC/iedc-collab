import "./Footer.scss";
import bubble6 from "../../assets/bubble_6.svg";
import bubble7 from "../../assets/bubble_7.svg";
import mail from "../../assets/Mail.png";
import github from "../../assets/Github.png";
import linkedin from "../../assets/linkedin.png";
const Footer = () => {
  return (<>
  <div className="footer_main" >
  <img src={bubble6} alt="" className="bubble_6" />
    <div className="footer_icons">
    <a href={`mailto: iedc@mec.ac.in`}>
    <img src={mail} alt="" className="mail" /></a>
    <a href='https://www.linkedin.com/company/iedcmec/'>
    <img src={linkedin} alt="" className="linkedin" />
    </a>
    <a href='https://github.com/IEDCMEC'>
    <img src={github} alt="" className="github" /></a>
    </div>
    <img src={bubble7} alt="" className="bubble_7" />
  </div>
  </>);
};
export default Footer;
