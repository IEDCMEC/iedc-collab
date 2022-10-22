import React, {  useEffect, useState } from "react";
import "./Projects.scss";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MainLayout from '../../Components/MainLayout/MainLayout'
import { getProjects } from "../../Firebase/firebase";
// import { ProjectContext } from "../../contexts/ProjectContext";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const getWorks = async () => {
    await getProjects().then(async function (snapshot) {
      let messageObject = snapshot.val();
      const result = Object.keys(messageObject).map((key) => ({
        ...messageObject[key],
        id: key,
      }));
      setProjects(result); setLoading(false);
    });
  };
  useEffect(() => {
    getWorks();
   
  }, [projects]);
  const history = useHistory();
  const handleClick = (p) => {
    history.push(`/projects/${p.id}`);
  };
  if (loading) {
    return (
        <div>
           <MainLayout/>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "90vh" }}
      >
        
        <div className="spinner-border" role="status"></div>
        <div className="mt-3">Loading Projects...</div>
      </div>
      </div>
    );
  }
  return (
    <><MainLayout/>
      <Container className="landing">
        <h3 style={{ textAlign: "center" }}>
          {projects.length === 0 && projects.length !== 0
            ? "NOT FOUND"
            : "PROJECTS"}
        </h3>

        {projects.map((project) => (
          <div
            key={project.id}
            className="cards"
            onClick={() => handleClick(project)}
          >
            <div className="col-centered">
              <div className="card" style={{ justifyContent: "center" }}>
                <div className="card__image-holder">
                  <img
                    className="img-fluid"
                    src={
                      project.projectPhoto ||
                      "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                    }
                    alt="project banner"
                  />
                </div>
                <div className="card-title">
                  <h2 className="justify-content-center text-uppercase">
                    {project.name}
                    <small className="justify-content-center text-capitalize">
                      {project.leader_name}
                    </small>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Projects;
