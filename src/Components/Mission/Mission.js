import "./Mission.scss";
import bubble2 from "../../assets/bubble_2.svg";
const Mission = () => {
  return (
    <div className="mission_main">
      <div
        className="heading_mission"
        data-aos="fade-right"
        data-aos-duration="2000"
      >
        OUR MISSION
      </div>
      <div
        className="paragraph_mission"
        data-aos="fade-right"
        data-aos-duration="2000"
      >
        IEDC MEC is built on the intentions of developing, nurturing and
        sustaining an entrepreneurial ecosystem in MEC and to promote innovation
        driven entrepreneurship culture and provide assistance to potential
        entrepreneurs of MEC.
        <br />
        <br />
        Collab MEC sets its sights on enhancing the coding culture in MEC and in
        turn the quality of projects and developers made in MEC. With Collab,
        every developer finds a project and every project finds its developers.
      </div>
      <img src={bubble2} alt="" className="bubble_2" />
    </div>
  );
};
export default Mission;
