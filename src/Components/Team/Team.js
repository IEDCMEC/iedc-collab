import "./Team.scss";
import TeamCard from "./TeamCard";
import animation from "../../animations/test.json";
import Lottie from "react-lottie";
import bubble4 from "../../assets/bubble_4.svg";
import bubble5 from "../../assets/bubble_5.svg";
import { useHistory } from "react-router-dom";
import core from "../../data/core";
const Team = () => {
  const history = useHistory();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  return (
    <>
      <div className="team_main">
        <div
          className="heading_team"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          OUR TEAM
        </div>
        <img src={bubble4} alt="" className="bubble_4" />
        <div className="team" data-aos="fade-up" data-aos-duration="2000">
          <TeamCard data={core} />
        </div>
        <img src={bubble5} alt="" className="bubble_5" />
        <div
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
        </div>
        <button
          onClick={() => {
            history.push("/team");
          }}
          type="button"
          style={{ marginBottom: "2rem" }}
          className="btn btn-danger"
        >
          View All
        </button>
        <div
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
        </div>
      </div>
    </>
  );
};
export default Team;
