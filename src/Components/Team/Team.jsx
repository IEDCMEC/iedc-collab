import React from 'react';
import './Team.scss';
import { useHistory } from 'react-router-dom';
import TeamCard from './TeamCard';
// import animation from "../../animations/test.json";
// import Lottie from "react-lottie";
import bubble4 from '../../assets/bubble_4.svg';
import bubble5 from '../../assets/bubble_5.svg';
import core from '../../data/core';

function Team() {
  const history = useHistory();
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animation,
  //   rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  // };
  return (
    <div className="tech_team_info">
      <div className="heading_team" data-aos="fade-up" data-aos-duration="2000">
        OUR TEAM
      </div>
      <div className="members__div" data-aos="fade-up" data-aos-duration="2000">
        <img src={bubble4} alt="" className="bubble_4" />
        <TeamCard data={core} />
      </div>

      <img src={bubble5} alt="" className="bubble_5" />
      {/* <div
          className="team__anime"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <Lottie
            animationData={animation}
            loop={true}
            autoPlay={true}
            options={defaultOptions}
          />
        </div> */}
      <div
        onClick={() => {
          history.push('/team');
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            history.push('/team');
          }
        }}
        role="button"
        tabIndex={0}
        style={{ marginBottom: '2rem', marginTop: '2rem', cursor: 'pointer' }}
        className="btn btn-danger"
      >
        View All
      </div>
      {/* <div
          className="team__anime-1"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <Lottie
            animationData={animation}
            loop={true}
            autoPlay={true}
            options={defaultOptions}
          />
        </div> */}
    </div>
  );
}
export default Team;
