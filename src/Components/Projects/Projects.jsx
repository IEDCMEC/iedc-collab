import React, { useLayoutEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectList from '../ProjectList/ProjectList';
import './Project.scss';
import ProjectDetails, {
  ProjectDetailMob,
} from '../ProjectDetails/ProjectDetails';

const breakPoint = 771;
function ProjectsView({ showDetailsDirectly = false }) {
  const [width, setWidth] = useState(0);
  const [showProjectDetailsNotList, setShowProjectDetailsNotList] = useState(
    showDetailsDirectly
  );

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Container fluid className="project-container">
      {width < breakPoint ? (
        <div className="">
          {showProjectDetailsNotList ? (
            <ProjectDetailMob
              setShowProjectDetailsNotList={setShowProjectDetailsNotList}
            />
          ) : (
            <ProjectList
              setShowProjectDetailsNotList={setShowProjectDetailsNotList}
              width={width}
            />
          )}
        </div>
      ) : (
        <Row className="">
          <Col md={4} className="   p-0 shadow-right">
            <ProjectList />
          </Col>
          <Col className="projectDetails">
            <ProjectDetails />
          </Col>
        </Row>
      )}
    </Container>
  );
}

ProjectsView.propTypes = {
  showDetailsDirectly: false,
};

export default ProjectsView;
