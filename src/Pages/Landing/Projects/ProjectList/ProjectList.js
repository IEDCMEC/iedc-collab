import React from "react";
import ProjectBox from "./ProjectBox";
import {Col} from "react-bootstrap";

const ProjectList = () =>{
    return(
        <Col className={" overflow"}>
        
        <div className="content post-item">
        <svg class="bi bi-bookmark-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M3 3a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V3z" clip-rule="evenodd"/>
</svg>

            <ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"}></ProjectBox></div>
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
