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
        IEDC-MEC shall promote and foster entrepreneurial culture in the college
        and will provide a platform for the students to pursue entrepreneurial
        activities.
        <br />
        <br />
        It shall provide assistance to potential entrepreneurs of MEC, conduct
        activities that develop entrepreneurial qualities in students and shall
        provide common facilities to students working on start-ups.
      </div>
      <img src={bubble1} alt="" className="bubble_1" />
    </div>
  );
};
export default Vision;
