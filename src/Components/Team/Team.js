import "./Team.scss";
import TeamCard from "./TeamCard";
import animation from "../../animations/test.json";
import Lottie from "react-lottie";
import bubble4 from "../../assets/bubble_4.svg";
import bubble5 from "../../assets/bubble_5.svg";
const Team = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  return (
    <>
      <div className="team_main">
        <div className="heading_team">OUR TEAM</div>
        <img src={bubble4} alt="" className="bubble_4" />
        <div className="team">
          <TeamCard />
        </div>
        <img src={bubble5} alt="" className="bubble_5" />
        <div className="anime">
          <Lottie options={defaultOptions} />
        </div>
        <div className="anime-1">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </>
  );
};
export default Team;
