import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import {useHistory} from 'react-router'
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { doCreateProject, doEditProject } from "../../../Firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./NewProjectModal.scss";


const NewProjectForm = ({ onClose, project}) => {
  console.log(onClose);
  console.log(project);
  const history = useHistory();
  const [image, setImage] = useState('');
  var initialValue = {};
  var defaultImage='https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60';
  
  function isFileImage(file) {
      return file && file['type'].split('/')[0] === 'image';
  }
  if(project!==undefined){
  if(project.photo!==undefined){
  defaultImage=project.photo;}
    
     initialValue ={
      title: project.name,
      desc: project.desc,
      links: project.links.toString(),
      contactNo: project.contactNo,
      githubLink: project.githubLink,
      tags: project.tags?project.tags.toString():"",
      teamMembers: project.teamMembers.toString(),
      photo: project.photo,
    }
  }
  else{
     initialValue = {
      title: "",
      desc: "",
      links: "",
      contactNo: "",
      githubLink: "",
      tags: "",
      teamMembers: "",

    };
  }
  const newProjectSchema = yup.object({
    title: yup.string().required("Please add a valid title").min(3),
    desc: yup.string().required("Please add a valid description").min(10),
    links: yup.string().min(4),
    contactNo: yup
      .string()
      .required()
      .matches(
        /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Please enter a valid 10 digit phone number"
      ),
    githubLink: yup.string().optional().min(4),
    tags: yup.string(),
    teamMembers: yup.string(),
  });

  const [projectPhoto, setProjectPhoto] = useState(null);

  return (
    <div className="newProjectForm">
      <Formik
        initialValues={initialValue}
        validationSchema={newProjectSchema}
        onSubmit={(values, actions) => {
          const { links, tags, teamMembers } = values;
          const formValues = {
            ...values,
            links: links.split(",").map((link) => link.trim()),
            tags: tags.split(",").map((link) => link.trim()),
            teamMembers: teamMembers.split(",").map((link) => link.trim()),
            photo: projectPhoto,
          };
          if(project===undefined){
            doCreateProject(formValues);
            }
          else{
               console.log(`${project.id}`);
              doEditProject(formValues,project.id);}
          onClose();
          actions.resetForm();
         history.go(0);
        }}
      >
        {(props) => (
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                required
                onBlur={props.handleBlur("title")}
                value={props.values.title}
                onChange={props.handleChange("title")}
                type="text"
                placeholder="Enter Project Title"
              />
              <Form.Text className="text-danger">
                {props.touched.title && props.errors.title}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                onBlur={props.handleBlur("desc")}
                value={props.values.desc}
                onChange={props.handleChange("desc")}
                as="textarea"
                placeholder="lorem ipsum dolor si amet..."
                rows="3"
              />
              <Form.Text className="text-danger">
                {props.touched.desc && props.errors.desc
                  ? "Please enter a description greater than 10 characters"
                  : ""}
              </Form.Text>
            </Form.Group>

            <InputGroup controlId="formPhoto" className="photoContainer">
              <Form.Label className="photoLabel">
                <i className="photoHead">Upload Featuring Photo*</i>
                <i className="photoIcon">
                  <FontAwesomeIcon icon={faUpload} />
                </i>
                <p>{projectPhoto?projectPhoto.name:'default Image'} </p>

                <Form.Control
                  required
                  onBlur={props.handleBlur("photo")}
                  onChange={(e) => {
                    if(isFileImage(e.target.files[0])){
                    setProjectPhoto(e.target.files[0]);
                    setImage(URL.createObjectURL(e.target.files[0]))
                    }
                    else{
                      alert("Please upload an image file");
                    }
                  }}
                  type="file"
                  className="customFile"
                />
              </Form.Label>
            </InputGroup>
            <Form.Text className="text-danger">
              {props.touched.photo && props.errors.photo}
            </Form.Text>
            <Row className="col-md-12 d-flex justify-content-center">
              
            <img className="projectPhoto" alt="" width="200px" height="200px" src={image ? image : defaultImage}></img>
            
            </Row>
            <Form.Group controlId="formTeamMembers">
              <Form.Label>Team Members</Form.Label>
              <Form.Control
                onBlur={props.handleBlur("teamMembers")}
                value={props.values.teamMembers}
                onChange={props.handleChange("teamMembers")}
                type="text"
                placeholder="Enter Team members name..."
              />
              <Form.Text className="text-right helperText">
                Please separate the names using commas
              </Form.Text>
              <Form.Text className="text-danger">
                {props.touched.teamMembers && props.errors.teamMembers}
              </Form.Text>
            </Form.Group>

            <Row>
              <Form.Group controlId="formContactNo" className="col-md-6">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("contactNo")}
                  value={props.values.contactNo}
                  onChange={props.handleChange("contactNo")}
                  type="text"
                  placeholder="Enter your contact no"
                />
                <Form.Text className="text-danger">
                  {props.touched.contactNo && props.errors.contactNo}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formGithubLink" className="col-md-6">
                <Form.Label>Project Github Link</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("githubLink")}
                  value={props.values.githubLink}
                  onChange={props.handleChange("githubLink")}
                  type="text"
                  placeholder="Enter your project link"
                />
                <Form.Text className="text-danger">
                  {props.touched.githubLink && props.errors.githubLink}
                </Form.Text>
              </Form.Group>
            </Row>

            <Form.Group controlId="formTags">
              <Form.Label>Add Tags</Form.Label>
              <Form.Control
                onBlur={props.handleBlur("tags")}
                value={props.values.tags}
                onChange={props.handleChange("tags")}
                type="text"
                placeholder="eg: webdevelopment, appdevelopment"
              />
              <Form.Text className="helperText text-right">
                Please separate the tags using commas
              </Form.Text>
              <Form.Text className="text-danger">
                {props.touched.tags && props.errors.tags}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formLinks">
              <Form.Label>Add Links</Form.Label>
              <Form.Control
                onBlur={props.handleBlur("links")}
                value={props.values.links}
                onChange={props.handleChange("links")}
                type="text"
                placeholder="eg: www.example.com"
              />
              <Form.Text className="helperText text-right">
                Please separate the links using commas
              </Form.Text>
              <Form.Text className="text-danger">
                {props.touched.links && props.errors.links}
              </Form.Text>
            </Form.Group>
            <Row className="col-md-12 d-flex justify-content-center">
              <Button
                variant="outline-danger"
                type="submit"
                size="md"
                onClick={props.handleSubmit}
              >
                <strong>Submit</strong>
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const NewProjectModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modalbody" style={{ position: "relative" }}>
        <h3 className="modalHead">Create New Project</h3>
        <i
          className="fa fa-close d-block d-md-none"
          style={{
            position: "absolute",
            top: "15px",
            fontSize: "25px",
            right: "30px",
            padding: 10,
            cursor: "pointer",
          }}
          onClick={props.onHide}
        ></i>
        <Col className="p-md-5">
          <h5 className="modalHead2">Please add details about your project</h5>
          <NewProjectForm onClose={props.onHide} project = {props.project} />
        </Col>
      </Modal.Body>
    </Modal>
  );
};
export default NewProjectModal;
