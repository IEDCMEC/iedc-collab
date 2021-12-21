import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col, InputGroup, Input } from "react-bootstrap";
import { doCreateProject } from "../../../Firebase/firebase";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./NewProjectModal.scss";

const NewProjectForm = ({ onClose }) => {
  console.log(onClose);
  const newProjectSchema = yup.object({
  title: yup.string().required("Please add a valid title").min(3),
    desc: yup.string().required("Please add a valid description").min(10),
 //   links: yup.string().optional().min(4),
    contactNo: yup
      .string()
      .required("Please add a valid phone number")
      .min(10, "Must be more than 10 characters"),
    githubLink: yup.string().optional().min(4),
  //  tags: yup.string().optional().min(4),
    teamMembers: yup.string(),
  });

  const history = useHistory();

  return (
    <div className="newProjectForm">
      <Formik
        initialValues={{
          title: "",
          desc: "",
          links: "",
          contactNo: "",
          githubLink: "",
          tags: "",
        }}
        validationSchema={newProjectSchema}
        onSubmit={(values, actions) => {
          const { links, tags, photo } = values;
          values.links = links.split(",").map((link) => link.trim());
          values.tags = tags.split(",").map((tag) => tag.trim());
         
          doCreateProject(values);

         //  doCreateProject(
           //  values.title,
             //values.desc,
             //values.links,
             //values.contactNo,
             //values.githubLink,
             //values.tags
         //  );
          actions.resetForm();
          history.push('/');
          onClose();
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
                {props.touched.desc && props.errors.desc}
              </Form.Text>
            </Form.Group>

            <InputGroup controlId="formPhoto" className="photoContainer">
              <Form.Label className="photoLabel">
                <i className="photoHead">Upload Featuring Photo</i>
                <i className="photoIcon">
                  <FontAwesomeIcon icon={faUpload} />
                </i>
                <Form.Control
                  required
                  onBlur={props.handleBlur("photo")}
                  value={""}
                  onChange={(e)=>{props.handleChange("photo");props.values.photo=e.target.files[0];}}
                  type="file"
                  className="customFile"
                />
              </Form.Label>
            </InputGroup>
            <Form.Text className="text-danger">
              {props.touched.photo && props.errors.photo}
            </Form.Text>

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
                Please separate the links using commas
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
                placeholder="#webdevelopmet,#appdevelopment"
              />
              <Form.Text className="helperText text-right">
                Please separate the links using commas
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
                placeholder="www.tata.com"
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
      {/* <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Create New Project
        </Modal.Title>
      </Modal.Header> */}

      <Modal.Body className="modalbody">
        <h3 className="modalHead">Create New Project</h3>
        <Col className="p-md-5">
          <h5 className="modalHead2">Please add details about your project</h5>
          <NewProjectForm onClose={props.onHide} />
        </Col>
      </Modal.Body>
    </Modal>
  );
};
export default NewProjectModal;
