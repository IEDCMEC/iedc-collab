import React, { useContext } from "react";
import "./Projects.scss";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";
import Navbar from "../../Components/NavigateBar/NavigateBar";
import Nav from "../../Components/Navbar/Navbar";
const Projects = () => {
  const { projects, setSelectedProject, allProjects, loading } = useContext(
    ProjectContext
  );
  const history = useHistory();
  const handleClick = (p) => {
    history.push("/details", { showDetailsDirectly: true });
    setSelectedProject(p);
  };
  if (loading) {
    return (
        <div>
            <Navbar/>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "90vh" }}
      >
        
        <div className="spinner-border" role="status"></div>
        <div className="mt-3">Loading projects...</div>
      </div>
      </div>
    );
  }
  return (
    <>
    <Navbar/>
    <Nav/>
      <Container className="landing">
        <h3 style={{ textAlign: "center" }}>
          {projects.length === 0 && allProjects.length !== 0
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
