import "./Vision.scss";
import bubble1 from "../../assets/bubble_1.svg";
import Aos from "aos";

const Vision = () => {
    Aos.init({
      duration : 200
    });
  return (
    <div className="vision_main">
      <div className="heading_vision"  data-aos="fade-right" data-aos-duration="2000">OUR VISION</div>
      <div className="paragraph_vision"  data-aos="fade-right" data-aos-duration="2000">
      To promote and enrich entrepreneurial culture in MEC, strengthening and supporting innovative ideas using technology 
      and mentorship for social and economic growth; developing and nurturing job creators in MEC.
        <br />
        <br />
        Collab MEC envisions creating world class developers and world class projects and a wide network of developers.
      </div>
      <img src={bubble1} alt="" className="bubble_1" />
    </div>
  );
};
export default Vision;
