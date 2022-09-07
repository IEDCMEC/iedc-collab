import React from 'react'
import './ProjectToggle.scss'
import { NavLink } from 'react-router-dom'

const ProjectToggle = () => {
    return (
        <div className='project-toggle__container'>

            <div className='project-toggle__title'> PROJECT LIFEBOAT</div>

            <div className='project-toggle__options'>
                <NavLink exact activeClassName='project-toggle__NavLinksActive' classname="project-toggle__NavLinks " to={'/description'}>Description</NavLink>
                <NavLink exact activeClassName='project-toggle__NavLinksActive' classname="project-toggle__NavLinks " to={'/requirements'}>Requirements</NavLink>
                <NavLink exact activeClassName='project-toggle__NavLinksActive' classname="project-toggle__NavLinks " to={'/discussion'}>Discussion</NavLink>

            </div>

        </div>

    )
}

export default ProjectToggle;