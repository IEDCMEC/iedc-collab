import "./Team.scss";
import TeamData from "./TeamData";
const TeamCard = () => {
  return TeamData.map((data) => (<div data-aos="zoom-in" data-aos-duration="2000" key={data.id}>
    <div className="member">
      <img src={data.image} alt={data.name} />
      <div className="name">{data.name}</div>
      <a href={data.linkedin} target="blank" className="team_a">
        <p>LinkedIn</p>
      </a>
      <p>Role: {data.role}</p>
    </div>
    </div>
  ));
};
export default TeamCard;
