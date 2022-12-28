import "./Team.scss";
const TeamCard = ({ data }) => {
  return data.map((data) => (
    <div data-aos="zoom-in" data-aos-duration="2000" key={data.id}>
      <div className="member">
        <img src={data.image} alt={data.name} />
        <div className="name">{data.name}</div>
        <div className="role">{data?.role}</div>
        {data.linkedin && (
          <a href={data?.linkedin} target="blank" className="team_a">
            <p>LinkedIn</p>
          </a>
        )}
      </div>
    </div>
  ));
};
export default TeamCard;
