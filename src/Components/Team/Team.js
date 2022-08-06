import "./Team.scss";
import bubble4 from '../../assets/bubble_4.svg';
import bubble5 from '../../assets/bubble_5.svg';
import TeamCard from "./TeamCard";
const Team = () => {
  return (
    <div className="team_main">
      <div className="heading_team">OUR TEAM</div>
     
  <div className="team">
    <TeamCard/>
  </div>
  <img src={bubble4} alt="" className="bubble_4" />
  <img src={bubble5} alt="" className="bubble_5" />
</div>
  );
};
export default Team;
