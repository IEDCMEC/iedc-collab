import "./Team.scss";
import TeamCard from "./TeamCard";
import animation from "../../animations/test.json";
import Lottie from "react-lottie";
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

        <div className="team">
          <TeamCard />
        </div>
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
