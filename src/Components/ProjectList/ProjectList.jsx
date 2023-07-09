import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import ProjectBox from './ProjectBox';
import { ProjectContext } from '../../contexts/ProjectContext';

function ProjectList({ width, setShowProjectDetailsNotList }) {
  const { projects, setSelectedProject } = useContext(ProjectContext);

  return (
    <Col className=" overflow " style={{ maxHeight: '90vh' }}>
      {projects.map((x) => (
        <div
          className="content post-item"
          key={x.id}
          onClick={() => {
            setSelectedProject(x);
            if (width < 768) setShowProjectDetailsNotList(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setSelectedProject(x);
              if (width < 768) setShowProjectDetailsNotList(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <ProjectBox
            name={x.name}
            teamLeader={x.leader_name}
            projectId={x.id}
          />
        </div>
      ))}
    </Col>
  );
}

export default ProjectList;
