import React from "react";
import ProjectBox from "./ProjectBox";
import {Col} from "react-bootstrap";

const ProjectList = () =>{
    return(
        <Col className={" overflow"}>
        
        <div className="content post-item"><ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"}></ProjectBox></div>
        <div className="content post-item"><ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} /></div>
        <div className="content post-item"><ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} /></div>
        <div className="content post-item"><ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} /></div>
        <div className="content post-item"><ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} /></div>
        <div className="content post-item"><ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} /></div>
        <div className="content post-item"><ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} /></div>
        

        </Col>
    )
};

export default ProjectList
