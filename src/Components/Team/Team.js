import "./Team.scss";
import bubble4 from '../../assets/bubble_4.svg';
import bubble5 from '../../assets/bubble_5.svg';
const Team = () => {
  return (
    <div className="team_main">
      <div className="heading_team">OUR TEAM</div>
     
  <div class="team">
    <div class="member">
      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="member_image"/>
      <div class="name">Paul Doe</div>
      <a href="/" className="team_a"><span>LinkedIn</span></a>
    </div>
    <div class="member">
      <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="member_image"/>
      <div class="name">Paul Doe</div>
      <a href="/" className="team_a"><span>LinkedIn</span></a>
    </div>
    <div class="member">
      <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="member_image"/>
      <div class="name">Paul Doe</div>
      <a href="/" className="team_a"><span>LinkedIn</span></a>
    </div>
    <div class="member">
      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="member_image"/>
      <div class="name">Paul Doe</div>
      <a href="/" className="team_a"><span>LinkedIn</span></a>
    </div>
    <div class="member">
      <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="member_image"/>
      <div class="name">Paul Doe</div>
      <a href="/" className="team_a"><span>LinkedIn</span></a>
    </div>
    <div class="member">
      <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="member_image"/>
      <div class="name">Paul Doe</div>
      <a href="/" className="team_a"><span>LinkedIn</span></a>
    </div>
  </div>
  <img src={bubble4} alt="" className="bubble_4" />
  <img src={bubble5} alt="" className="bubble_5" />
</div>
  );
};
export default Team;
