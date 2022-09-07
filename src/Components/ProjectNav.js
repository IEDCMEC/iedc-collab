import React from 'react'
import './ProjectNav.scss'

import arrow from '../assets/arrow.png'
import profile from '../assets/profile.png'
import like from '../assets/like.png'

const ProjectNav = () => {
    return (
        <div className='project-nav__container'>

            <div className='project-nav__title-icon'>
                <img src={arrow} className=" project-nav__arrow " alt='arrow' />
                <img src={profile} className=" project-nav__profile" alt='profile' />
                <h2 className='project-nav__title'>Mohammad Razeen</h2>
            </div>
            <div className='project-nav__likes-join'>
                <img src={like} alt="like" className='project-nav__like' />
                <div className='project-nav__number-likes'>15 Likes</div>
                <button className='project-nav__button'>Join Team</button>
            </div>

        </div>

    )
}

export default ProjectNav;