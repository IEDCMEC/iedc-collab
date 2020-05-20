import React from "react";
import Navigate from './NavigateBar';
import ProjectList from './projectList'


import "./page2.css";
import Cards_Team from "./cards_team";
import Projects from "./Projects/Projects";
const Landing = () => {
  return (
    <div>
    <Navigate/>
    <Projects/>
    {/*<ProjectList/>*/}
    {/*<Cards_Team/>*/}
    </div>
  );
}

export default Landing;