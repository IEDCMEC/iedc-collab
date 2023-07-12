import React from 'react';
import './Team.scss';
import NavbarHome from '../../Components/NavbarHome/NavbarHome';
import Footer from '../../Components/Footer/Footer';
import designers from '../../data/designers';
import developers from '../../data/developers';
import bubble2 from '../../assets/bubble_2.svg';
import bubble3 from '../../assets/bubble_3.svg';
import bubble5 from '../../assets/bubble_5.svg';
import bubble1 from '../../assets/bubble_1.svg';
import TeamCard from '../../Components/Team/TeamCard';
import core from '../../data/core';

function Team() {
  return (
    <div>
      <NavbarHome />
      <div className="team__data_page_container_1">
        <img src={bubble2} alt="" className="bubble_2_1" />
        <img src={bubble3} alt="" className="bubble_3" />

        <img src={bubble1} alt="" className="bubble_1" />
        <div className="tech_team_info">
          <div className="team__title" data-aos="zoom-in" aos-delay="150">
            CORE TEAM
          </div>
          <div className="members__div" data-aos="zoom-in" aos-delay="150">
            <TeamCard data={core} />
          </div>
        </div>
        <div className="tech_team_info">
          <div className="team__title">TECH TEAM</div>
          <div className="members__div">
            <TeamCard data={developers} />
          </div>
        </div>
        <div className="design_team_info">
          <p className="team__title">DESIGN TEAM</p>
          <div className="members__div">
            <TeamCard data={designers} />
          </div>
        </div>
      </div>
      <img src={bubble5} alt="" className="bubble_5" />
      <Footer />
    </div>
  );
}

export default Team;
