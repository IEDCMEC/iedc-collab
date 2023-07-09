import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProjectToggle from '../../Components/ProjectToggle/ProjectToggle';
import MainLayout from '../../Components/MainLayout/MainLayout';
import ProjectCarousel from '../../Components/ProjectCarousel/ProjectCarousel';
import ProjectNav from '../../Components/ProjectNav/ProjectNav';
import DiscussionDetails from '../../Components/DisussionDetails/DiscussionDetails';
import RequirementDetails from '../../Components/RequirementDetails/RequirementDetails';
import DescriptionDetails from '../../Components/DescriptionDetails/DescriptionDetails';
import './ProjectDetail.scss';
import { getProject } from '../../Firebase/firebase';
import SuspenseLoader from '../../Components/SuspenseLoader/SuspenseLoader';

function ProjectDetail() {
  const { id } = useParams();
  const [selectedProject, setSelectedProject] = useState({});
  const [variable, setVariable] = useState(true);
  const [loading, setLoading] = useState(true);
  const getWork = async (projectId) => {
    const project = await getProject(projectId);
    const p = await project.val();
    p.id = projectId;
    setSelectedProject(p);
    setLoading(false);
  };

  useEffect(() => {
    getWork(id);
  }, [id, variable]);
  const [toggle, setToggle] = useState(1);
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
    <MainLayout route="Projects">
      <ProjectCarousel project={selectedProject} />
      <ProjectNav selectedProject={selectedProject} />
      <div className="project_details_flex">
        <ProjectToggle
          toggle={toggle}
          setToggle={setToggle}
          selectedProject={selectedProject}
        />

        <div className="details__container">
          {toggle === 1 && (
            <DescriptionDetails
              selectedProject={selectedProject}
              setVariable={setVariable}
              variable={variable}
            />
          )}
          {toggle === 2 && (
            <RequirementDetails
              selectedProject={selectedProject}
              setVariable={setVariable}
              variable={variable}
            />
          )}
          {toggle === 3 && (
            <DiscussionDetails
              selectedProject={selectedProject}
              setVariable={setVariable}
              variable={variable}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
export default ProjectDetail;
