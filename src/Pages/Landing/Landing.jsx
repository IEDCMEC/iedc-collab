import React, { useContext } from "react";
import "./Landing.scss";
import { Container, Row, Col } from "react-bootstrap";
import Collab from "../../assets/collab.png";
import Work from "../../assets/work.png";
import Logo from "../../assets/logo.svg";
import { useHistory } from "react-router-dom";
import "firebase/auth";
import { ProjectContext } from "../../contexts/ProjectContext";

//import {signIn} from '../Firebase/auth';

const Landing = (props) => {
  const { projects } = useContext(ProjectContext);
  // console.log(projects)2

  return (
    <>
      <Container className={"landing"}>
        <h3 style={{ textAlign: "center" }}>PROJECTS</h3>

        {projects.map((project) => (
          <div className="cards">
            <div className="card">
              <div className="card__image-holder">
                <img
                  className="card__image"
                  src="https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  alt="wave"
                />
              </div>
              <div className="card-title">
                <h2 className="justify-content-center">
                  {project.name}
                  <small className="justify-content-center">
                    {" "}
                    {project.leader_name}
                  </small>
                </h2>
              </div>
            </div>
          </div>

          // <div>
          //   <h2>{project.name}</h2>
          // </div>
        ))}
      </Container>
    </>
  );
};

export default Landing;
