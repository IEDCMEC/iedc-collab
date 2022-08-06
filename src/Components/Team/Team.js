import "./Team.scss";

import bubble5 from '../../assets/bubble_5.svg';
import TeamCard from "./TeamCard";
const Team = () => {
  return (
    <div className="team_main">
      <div className="heading_team">OUR TEAM</div>
     
  <div className="team">
    <TeamCard/>
  </div>
 
  <img src={bubble5} alt="" className="bubble_5" />
</div>
  );
};
export default Team;
