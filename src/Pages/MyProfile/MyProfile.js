import React from 'react'
import './MyProfile.scss'
import edit_icon from '../../assets/edit_profile_icon.svg'
import MainLayout from '../../Components/MainLayout/MainLayout'
import {BsTelephoneInbound} from 'react-icons/bs'
import {HiOutlineAcademicCap} from 'react-icons/hi'
import {MdOutlineEmail} from 'react-icons/md'
import {TbNetwork} from 'react-icons/tb'
import {VscGithubInverted} from 'react-icons/vsc'
import {FaLinkedin} from 'react-icons/fa'
const MyProfile = () => {
  return (
    <MainLayout>
      <div className="my_profile_container">
        <div className="profile_board">
          <div className="pro_image_conatiner"><img src="https://vpnoverview.com/wp-content/uploads/what-is-a-hacker-what-is-hacking-featured-800x400.png"className='profile_image' alt="" />
          </div>
              
         
          <div className="profile_details_container">
          <div className="profile_details_header">

            <p className="profile__name">Marvin Joy</p>
            <img src={edit_icon} style={{width:'2rem'}} alt="" />
          </div>
          <div className="phone_class">
            <div className="profile_phone">
              <BsTelephoneInbound style={{width:'3rem'}}/>
              <p>798789778768</p>
            </div>
            <div className="profile_class">
              <HiOutlineAcademicCap style={{width:'3rem'}}/>
              <p>CSA20</p>
            </div>
          </div>
          <div className="profile_email">
            <MdOutlineEmail style={{width:'3rem'}}/>
            <p>bhbninjni@gmail.com</p>
          </div>
          <div className="profile_web">
            <TbNetwork style={{width:'3rem'}}/>
            <p>nidnuni.com</p>
          </div>
          <div className="profile_github">
            <VscGithubInverted style={{width:'3rem'}}/>
            <p>github.com/AchyuthMohan/</p>
          </div>
          <div className="profile_linkedin">
            <FaLinkedin style={{width:'3rem'}}/>
            <p>linkedin.com/en/bdbdi.com</p>
          </div>

          </div>
        </div>
        

        <div className="edit__pro_box">

          <div className="edit__header" >
              <div className='received'>Recieved</div><div className='sent'>Sent</div>
          </div>

          <div className="received_sent_box">

          </div>
          <div className="request__box">

          </div>

          <div className="portfolio__box"></div>
        </div>
        </div>

        
      
    </MainLayout>
  )
}

export default MyProfile