import React from 'react';
import './Team.scss';

const TeamCard = ({ data }) =>
  data.map((member) => (
    <div data-aos="zoom-in" data-aos-duration="2000" key={member.id}>
      <div className="member">
        <img src={member.image} alt={member.name} />
        <div className="name">{member.name}</div>
        <div className="role">{member?.role}</div>
        {member.linkedin && (
          <a href={member?.linkedin} target="blank" className="team_a">
            <p>LinkedIn</p>
          </a>
        )}
      </div>
    </div>
  ));
export default TeamCard;
