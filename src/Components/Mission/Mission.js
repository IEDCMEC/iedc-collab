import "./Mission.scss";
import bubble2 from "../../assets/bubble_2.svg";
const Mission = () => {
  return (
    <div className="mission_main">
      <div className="heading_mission">OUR MISSION</div>
      <div className="paragraph_mission">
        IEDC-MEC shall promote and foster entrepreneurial culture in the college
        and will provide a platform for the students to pursue entrepreneurial
        activities.
        <br />
        <br />
        It shall provide assistance to potential entrepreneurs of MEC, conduct
        activities that develop entrepreneurial qualities in students and shall
        provide common facilities to students working on start-ups.
      </div>
      <img src={bubble2} alt="" className="bubble_2" />
    </div>
  );
};
export default Mission;
