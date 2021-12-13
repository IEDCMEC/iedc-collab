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
        <h3 style={{ textAlign: "center" }}>Projects</h3>

        {/* {projects.map((project) => (
          <div>
            <h2>{project.name}</h2>
          </div>
        ))} */}
      </Container>
    </>
  );
};

export default Landing;
