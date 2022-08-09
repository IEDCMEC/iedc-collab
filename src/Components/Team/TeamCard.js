import "./Team.scss";
import TeamData from "./TeamData";
const TeamCard = () => {
  return TeamData.map((data) => (
    <div className="member">
      <img src={data.image} alt={data.name} />
      <div className="name">{data.name}</div>
      <a href={data.linkedin} target="blank" className="team_a">
        <span>LinkedIn</span>
      </a>
    </div>
  ));
};
export default TeamCard;
