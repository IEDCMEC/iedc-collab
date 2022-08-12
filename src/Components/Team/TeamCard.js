import "./Team.scss";
import TeamData from "./TeamData";
const TeamCard = () => {
  return TeamData.map((data) => (<div data-aos="zoom-in" data-aos-duration="2000">
    <div className="member">
      <img src={data.image} alt={data.name} />
      <div className="name">{data.name}</div>
      <a href={data.linkedin} target="blank" className="team_a">
        <span>LinkedIn</span>
      </a>
    </div>
    </div>
  ));
};
export default TeamCard;
