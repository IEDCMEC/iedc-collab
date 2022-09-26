import React from 'react'
import MainLayout from '../../Components/MainLayout/MainLayout'
import './MyProfile.scss'
import bgVector from '../../assets/MyprofileBg.svg'
const MyProfile = () => {
  return (
    <div>
      <MainLayout/>
        <div className='myProfile_main'>
          <div className='myProfile_left'>
            <div className='myProfile_details'>
              <div className='myProfile_pic'>
              <img src={bgVector} alt='bg' className='BgVector'/>
              </div>
              <h4>Marvin Joy</h4>
            </div>

          </div>
          <div className='myProfile_right'>
            <h2>jhbf</h2>
          </div>
        </div>
      
    </div>
  )
}

export default MyProfile