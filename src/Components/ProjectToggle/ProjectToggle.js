import React from 'react'
import './ProjectToggle.scss'
import { NavLink } from 'react-router-dom'

const ProjectToggle = () => {
    return (
        <div className='project-toggle__container'>

            <div className='project-toggle__title'> PROJECT LIFEBOAT</div>

            <div className='project-toggle__options'>
                <NavLink exact activeClassName='project-toggle__NavLinksActive' classname="project-toggle__NavLinks " to={'/test'}>Description</NavLink>
                <NavLink exact activeClassName='project-toggle__NavLinksActive' classname="project-toggle__NavLinks " to={'/test'}>Requirements</NavLink>
                <NavLink exact activeClassName='project-toggle__NavLinksActive' classname="project-toggle__NavLinks " to={'/test'}>Discussion</NavLink>

            </div>

        </div>

    )
}

export default ProjectToggle;