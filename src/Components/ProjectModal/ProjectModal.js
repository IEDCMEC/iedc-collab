import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { doCreateProject, doEditProject } from "../../Firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./ProjectModal.scss";
import { ProjectContext } from "../../contexts/ProjectContext";

const NewProjectForm = ({ onClose, project }) => {
  console.log(project);
  const [image, setImage] = useState(project?.projectPhoto || "");
  const [projectPhotoName, setProjectPhotoName] = useState(
    project?.projectPhotoName || ""
  );
  const [projectPhoto, setProjectPhoto] = useState(
    project?.projectPhoto || null
  );
  const { fetchData } = useContext(ProjectContext);
  const initialValue = {
    name: project?.name || "",
    desc: project?.desc || "",
    links: project?.links?.join(", ") || "",
    contactNo: project?.contactNo || "",
    githubLink: project?.githubLink || "",
    tags: project?.tags ? project.tags.join(", ") : "",
    teamMembers: project?.teamMembers ? project.teamMembers.join(", ") : "",
    projectPhoto: project?.projectPhoto,
  };

  const newProjectSchema = yup.object({
    name: yup.string().required("Please add a valid project name").min(3),
    desc: yup.string().required("Please add a valid description").min(10),
    contactNo: yup
      .string()
      .required()
      .matches(
        /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Please enter a valid 10 digit phone number"
      ),
    links: yup.string().min(4),
    githubLink: yup.string().optional().min(4),
    tags: yup.string(),
    teamMembers: yup.string(),
  });

  return (
    <div className="newProjectForm">
      <Formik
        initialValues={initialValue}
        validationSchema={newProjectSchema}
        onSubmit={(values, actions) => {
          const { links, tags, teamMembers } = values;
          const formValues = {
            ...values,
            links: links
              .split(",")
              .filter(Boolean)
              .map((link) => link.trim()),
            tags: tags
              .split(",")
              .filter(Boolean)
              .map((link) => link.trim()),
            teamMembers: teamMembers
              .split(",")
              .filter(Boolean)
              .map((link) => link.trim()),
            projectPhoto,
            projectPhotoName,
          };
          if (!project) {
            doCreateProject(formValues, fetchData);
          } else {
            doEditProject(formValues, project.id, fetchData);
          }
          onClose();
          actions.resetForm();
        }}
      >
        {(props) => (
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                required
                onBlur={props.handleBlur("name")}
                value={props.values.name}
                onChange={props.handleChange("name")}
                type="text"
                placeholder="Enter Project Title"
              />
              <Form.Text className="text-danger">
                {props.touched.name && props.errors.name}
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
                <i className="photoHead">Upload Featuring Photo</i>
                <i className="photoIcon">
                  <FontAwesomeIcon icon={faUpload} />
                </i>
                <p>{projectPhotoName}</p>

                <Form.Control
                  required
                  onBlur={props.handleBlur("photo")}
                  onChange={(e) => {
                    setProjectPhoto(e.target.files[0]);
                    setProjectPhotoName(e.target.files[0].name);
                    setImage(URL.createObjectURL(e.target.files[0]));
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
              {image && (
                <img
                  className="projectPhoto"
                  alt="project banner"
                  width="200px"
                  height="200px"
                  src={image}
                ></img>
              )}
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
                  placeholder="eg: https://github.com/IEDCMEC/iedc-collab-frontend/"
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
                placeholder="eg: webdev, nodejs"
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

const ProjectModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modalbody">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="modalHead ">Create New Project</h3>
          <i
            className="fa fa-close d-block d-md-none"
            style={{
              fontSize: "25px",
              right: "30px",
              padding: 10,
              cursor: "pointer",
            }}
            onClick={props.onHide}
          ></i>
        </div>
        <Col className="p-md-5">
          <h5 className="modalHead2">Please add details about your project</h5>
          <NewProjectForm onClose={props.onHide} project={props.project} />
        </Col>
      </Modal.Body>
    </Modal>
  );
};
export default ProjectModal;
