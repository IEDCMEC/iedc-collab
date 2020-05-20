import React from "react";
import Navigate from './NavigateBar';
import ProjectList from './projectList'
import Ca

import "./page2.css";
import Cards_Team from "./cards_team";

const Landing = () => {
  return (
    <div>
    <Navigate/>  
    
    <ProjectList/>
    
    <Cards_Team/>
    </div>
  );
}

export default Landing;