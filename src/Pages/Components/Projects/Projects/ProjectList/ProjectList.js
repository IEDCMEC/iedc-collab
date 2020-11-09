import React from "react";
import ProjectBox from "./ProjectBox";
import {Col} from "react-bootstrap";

const ProjectList = () =>{
    return(
        <Col className={" overflow "}>
        <div className="content post-item"><ProjectBox name={"SpaceX"} teamLeader={"Elon Musk"} /></div>
        <div className="content post-item"><ProjectBox name={"SpaceX"} teamLeader={"Elon Musk"} /></div>
        <div className="content post-item"><ProjectBox name={"SpaceX"} teamLeader={"Elon Musk"} /></div>
        <div className="content post-item"><ProjectBox name={"SpaceX"} teamLeader={"Elon Musk"} /></div>
        <div className="content post-item"><ProjectBox name={"SpaceX"} teamLeader={"Elon Musk"} /></div>
        <div className="content post-item"><ProjectBox name={"SpaceX"} teamLeader={"Elon Musk"} /></div>
        <div className="content post-item"><ProjectBox name={"SpaceX"} teamLeader={"Elon Musk"} /></div>
        

        </Col>
    )
};

export default ProjectList
