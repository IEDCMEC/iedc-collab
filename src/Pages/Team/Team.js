import React, { useEffect } from "react";
import "./Team.scss";
import NavbarHome from "../../Components/NavbarHome/NavbarHome";
import Footer from "../../Components/Footer/Footer";
import designers from "../../data/designers";
import developers from "../../data/developers";
import bubble2 from '../../assets/bubble_2.svg'
import bubble3 from '../../assets/bubble_3.svg'
import bubble5 from '../../assets/bubble_5.svg'
import Aos from "aos";
import bubble1 from '../../assets/bubble_1.svg'
const Team = () => {
  useEffect(()=>{
    Aos.init({duration:1100})
  },[])
  return (
    <div>
      <NavbarHome />
      <div className="team__data_page_container">
      <img src={bubble2} alt="" className="bubble_2_1" />
      <img src={bubble3} alt="" className="bubble_3" />
      <img src={bubble5} alt="" className="bubble_5" />
      <img src={bubble1} alt="" className="bubble_1" />
        <div className="tech_team_info">
          <div className="team__title">TECH TEAM</div>
          <div className="members__div">
            {developers.map((developer,index) => {
              return (
                <div data-aos='zoom-in' aos-delay='150' className="team__member_card" key={index}>
                  <img
                    className="team__member_image"
                    src={developer.image}
                    alt=""
                  />
                  <p>{developer.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="design_team_info">
          <p className="team__title">DESIGN TEAM</p>
          <div className="members__div">
            {designers.map((designer,index) => {
              return (
                <div data-aos='zoom-in' aos-delay='150' className="team__member_card" key={index}>
                  <img
                    className="team__member_image"
                    src={designer.image}
                    alt=""
                  />
                  <p>{designer.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Team;
