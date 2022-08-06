import "./Team.scss";
import TeamData from "./TeamData";
const TeamCard = () => {
  return (TeamData.map((data) => (
    <div className="member">
      <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        alt="member_image"
      />
      <div className="name">Paul Doe</div>
      <a href="/" className="team_a">
        <span>LinkedIn</span>
      </a>
    </div>))
  );
};
export default TeamCard;
