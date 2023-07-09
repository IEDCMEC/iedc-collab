import React from 'react';
import './About.scss';
import bubble3 from '../../assets/bubble_3.svg';

function About() {
  return (
    <div className="about_main">
      <div
        className="about_container"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="heading_about">ABOUT</div>

        <div className="paragraph_about">
          The Innovation and Entrepreneurship Development Cell (IEDC) is an
          active student-run cell under MEC Centre for Interdisciplinary
          Research (CCIR) that seeks to create, promote and nurture innovation
          and entrepreneurship skills among the students of MEC. MEC Collab, a
          major venture and flagship of IEDC MEC, is a responsible approach to
          solve a relevant problem; that of project leads being unable to find
          proficient developers and vice versa, developers looking for
          experience, but unable to find projects to work on. Collab MEC is an
          online platform that connects similar minded developers and project
          leads together.
        </div>
      </div>
      <img src={bubble3} alt="" className="bubble_3" />
    </div>
  );
}
export default About;