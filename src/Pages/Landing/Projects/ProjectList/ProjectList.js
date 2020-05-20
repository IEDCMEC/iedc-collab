import React from "react";
import ProjectBox from "./ProjectBox";
import {Col} from "react-bootstrap";

const ProjectList = () =>{
    return(
        <Col className={" overflow"}>
            <ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} />
            <ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} />
            <ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} />
            <ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} />
            <ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} />
            <ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} />
            <ProjectBox name={"Name"} skills={["a","b"]} projectName={"Ca"} />
        </Col>
    )
};

export default ProjectList
