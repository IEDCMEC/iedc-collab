import React, { useContext } from 'react'
import './ProjectToggle.scss'
import { NavLink } from 'react-router-dom'
import { ProjectContext } from '../../contexts/ProjectContext';
const ProjectToggle = () => {
    const { selectedProject } = useContext(ProjectContext);
    return (
        <div className='project-toggle__container'>

            <div className='project-toggle__title'>{selectedProject.name}</div>
            <div className="project-toggle__NavbarItems">
                                <NavLink exact activeClassName="project-toggle__NavLinksActive" className="project-toggle__NavLinks__desc" to='/description'>Description</NavLink>
                                <NavLink exact activeClassName="project-toggle__NavLinksActive"  className="project-toggle__NavLinks" to='/requirements'>Requirements</NavLink>
                                <NavLink exact activeClassName="project-toggle__NavLinksActive" className="project-toggle__NavLinks__disc" to='/discussion'>Discussion</NavLink>
                    
            </div>
           

        </div>

    )
}

export default ProjectToggle;