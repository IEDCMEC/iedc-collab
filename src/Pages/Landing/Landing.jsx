import React, { useContext } from "react";
import "./Landing.scss";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";

const Landing = () => {
  const { projects, setProject } = useContext(ProjectContext);
  const history = useHistory();
  const handleClick = (p) => {
    history.push("/collab");
    setProject(p);
  };

  return (
    <>
      <Container className="landing">
        <h3 style={{ textAlign: "center" }}>PROJECTS</h3>

        {projects.map((project) => (
          <div className="cards" onClick={() => handleClick(project)}>
            <div className="card">
              <div className="card__image-holder">
                <img
                  className="card__image"
                  src={
                    project.imgUrl ||
                    "https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  }
                  alt="project banner"
                />
              </div>
              <div className="card-title">
                <h2 className="justify-content-center text-capitalize">
                  {project.name}
                  <small className="justify-content-center">
                    {project.leader_name}
                  </small>
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Landing;
