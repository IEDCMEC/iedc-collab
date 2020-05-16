import React from "react";
import Navigate from './NavigateBar';
import ProjectList from './projectList'
import TeamSect from "./TeamSect";
import "./page2.css";

const Landing = () => {
  return (
    <div>
    <Navigate/>  
    
    <ProjectList/>
    
    
    </div>
  );
}

export default Landing;