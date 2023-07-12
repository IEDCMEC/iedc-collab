import React, { useContext, useEffect, useState } from 'react';
import './Projects.scss';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@mui/material';
import MainLayout from '../../Components/MainLayout/MainLayout';
import SuspenseLoader from '../../Components/SuspenseLoader/SuspenseLoader';
import { ProjectContext } from '../../contexts/ProjectContext';
import Drawer from '../Developers/Drawer';
// import { ThemeContext } from '../../App';

function Projects() {
  const { projects, loading } = useContext(ProjectContext);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);
  const [works, setWorks] = useState([]);
  // const { currentWidth, setcurrentWidth, width } = useContext(ThemeContext);
  // useEffect(() => {
  //   function changedWidth() {
  //     setcurrentWidth(window.innerWidth);
  //   }
  //   window.addEventListener('resize', changedWidth);
  //   return () => {
  //     window.removeEventListener('resize', changedWidth);
  //   };
  // }, [width, setcurrentWidth]);
  const filterProjects = () => {
    let filteredProjects = projects;
    if (selectedSkills.length > 0 && selectedTags.length > 0) {
      filteredProjects = filteredProjects.filter((p) => {
        let flag = false;
        p?.skills?.forEach((s) => {
          if (selectedSkills.find((ss) => ss === s)) flag = true;
        });
        p?.tags?.forEach((s) => {
          if (selectedTags.find((ss) => ss === s)) flag = true;
        });
        return flag;
      });
    } else {
      if (selectedSkills.length > 0) {
        filteredProjects = filteredProjects.filter((p) => {
          let flag = false;
          p?.skills?.forEach((s) => {
            if (selectedSkills.find((ss) => ss === s)) flag = true;
          });
          return flag;
        });
      }
      if (selectedTags.length > 0) {
        filteredProjects = filteredProjects.filter((p) => {
          let flag = false;
          p?.tags?.forEach((s) => {
            if (selectedTags.find((ss) => ss === s)) flag = true;
          });
          return flag;
        });
      }
    }
    setWorks(filteredProjects.slice(page * 12, page * 12 + 12));
    setPages(Math.ceil(filteredProjects.length / 12));
  };

  useEffect(() => {
    filterProjects();
  }, [selectedSkills, selectedTags]);

  useEffect(() => {
    setPage(0);
    setPages(Math.ceil(projects.length / 12));
    setWorks(projects.slice(page * 12, page * 12 + 12));
  }, [projects]);
  useEffect(() => {
    setWorks(projects.slice(page * 12, page * 12 + 12));
  }, [page]);
  const history = useHistory();
  const handleClick = (p) => {
    history.push(`/projects/${p.id}`);
  };

  if (loading) {
    return (
      <div>
        <MainLayout route="Projects">
          <SuspenseLoader />
        </MainLayout>
      </div>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        // justifyContent: width !== 0 ? 'flex-end' : 'center',
        width: '100vw',
      }}
    >
      <MainLayout route="Projects">
        <div
          className="projects_landing"
          style={{
            // width: currentWidth > 1000 ? `calc(100vw - ${width}px)` : '100vw',
            transition: '0.2s',
          }}
        >
          <Drawer
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            page="Projects"
          />
          <div>
            <h3
              style={{ textAlign: 'center', paddingTop: '3rem' }}
              className="developer-title"
            >
              {works.length === 0 ? 'NOT FOUND' : 'PROJECTS'}
            </h3>
            <div>
              {works && works.length === 0 ? (
                <p style={{ fontWeight: '600', color: 'black' }}>
                  Refine your filters please ..
                </p>
              ) : null}
            </div>
          </div>
          <div className="projects_cards">
            {works.map((project) => (
              <button
                type="button"
                data-aos="zoom-in"
                key={project.id}
                className="cards"
                onClick={() => handleClick(project)}
              >
                <div className="col-centered">
                  <div className="card" style={{ justifyContent: 'center' }}>
                    <div className="card__image-holder">
                      <img
                        className="img-fluid"
                        src={
                          project.projectPhoto ||
                          'https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
                        }
                        alt="project banner"
                      />
                    </div>
                    <div className="card-title">
                      <h2 className="justify-content-center text-uppercase">
                        {project.name}
                        <small className="justify-content-center text-capitalize">
                          {project.leader_name.toLowerCase()}
                        </small>
                      </h2>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <Pagination
            count={pages}
            page={page + 1}
            onChange={(e, val) => {
              setPage(val - 1);
            }}
            color="primary"
            sx={{
              paddingTop: '5rem',
            }}
          />
        </div>
      </MainLayout>
    </div>
  );
}

export default Projects;
