import React from 'react'
import './Team.scss'
import NavbarHome from '../../Components/NavbarHome/NavbarHome'
import designers from '../../data/designers'
import developers from '../../data/developers'
const Team = () => {
  return (
    <div>
      <NavbarHome/>
      <div className="team__data_page_container">
      <div className="tech_team_info">
        <p className='team__title'>Tech Team</p>
        <div className="members__div">
          {developers.map((developer)=>{
            return(
              <div className="team__member_card">
          <img className='team__member_image' src={developer.image} alt="image" />
          <p>{developer.name}</p>
        </div>
            )
          })}
          

      
        </div>
      </div>
      <div className="design_team_info">
      <p className='team__title'>Design Team</p>
      <div className="members__div">
          {designers.map((designer)=>{
            return(
              <div className="team__member_card">
              <img className='team__member_image' src={designer.image} alt="image" />
              <p>{designer.name}</p>
            </div>
            )
          })}
          
        </div>
      </div>
      </div>
    </div>
  )
}

export default Team