import React, { Component } from "react";
import Navigate from './NavigateBar';
import "./cards.css";
import Cards_Team from './cards_team';


const Project_page = () => {
  
  return (
    <div className="Project_page">
    <Navigate/> 
    <Cards_Team/>     
    </div>
  );
}

export default Project_page;