import "./Team.scss";
import TeamCard from "./TeamCard";
// import animation from "../../animations/test.json";
// import Lottie from "react-lottie";
import bubble4 from "../../assets/bubble_4.svg";
import bubble5 from "../../assets/bubble_5.svg";
import { useNavigate } from "react-router-dom";
import core from "../../data/core";
const Team = () => {
  const navigate = useNavigate();
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animation,
  //   rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  // };
  return (
    <>
      <div className="tech_team_info">
        <div
          className="heading_team"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          OUR TEAM
        </div>
        <div
          className="members__div"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <img src={bubble4} alt="" className="bubble_4" />
          <TeamCard data={core} />
        </div>

        <img src={bubble5} alt="" className="bubble_5" />
        {/* <div
          className="team__anime"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <Lottie
            animationData={animation}
            loop={true}
            autoPlay={true}
            options={defaultOptions}
          />
        </div> */}
        <div
          onClick={() => {
            navigate("/team");
          }}
          style={{ marginBottom: "2rem", marginTop: "2rem", cursor: "pointer" }}
          className="btn btn-danger"
        >
          View All
        </div>
        {/* <div
          className="team__anime-1"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <Lottie
            animationData={animation}
            loop={true}
            autoPlay={true}
            options={defaultOptions}
          />
        </div> */}
      </div>
    </>
  );
};
export default Team;
