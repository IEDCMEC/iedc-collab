import "./About.scss";
import bubble3 from "../../assets/bubble_3.svg";
const About = () => {
 
  return (<>
    <div className="about_main">
      <div className="about_container" data-aos="zoom-in" data-aos-duration="2000">
        <div className="heading_about" >ABOUT</div>

        <div className="paragraph_about" >
          The Innovation and Entrepreneurship Development Cell (IEDC) is an
          active student-run cell under MEC Centre for Interdisciplinary
          Research (CCIR) that seeks to create and promote innovation and
          entrepreneurship skills among the students of MEC. The cell works in
          close association with Kerala Startup Mission. It envisions fostering
          innovative thinking and becoming a facilitator between the students
          inside the campus and the industry outside by acting as a hub of
          contacts and network that helps in finding the wannabe entrepreneurs
          the right people to approach for any task.
        </div>
      </div>
      <img src={bubble3} alt="" className="bubble_3" />
    </div>
   
    </>
  );
};
export default About;
