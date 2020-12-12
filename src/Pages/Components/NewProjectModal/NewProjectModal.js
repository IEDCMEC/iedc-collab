import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import { doCreateProject } from '../../../Firebase/firebase';

// import ReactChipInput from "react-chip-input";
// import Chips from "react-chips";
// use if want to add links with some validation

const NewProjectForm = ({ onClose }) => {
  const newProjectSchema = yup.object({
    title: yup.string().required().min(3),
    desc: yup.string().required().min(10),
    links: yup.string().optional().min(4),
  });

  return (
    <div className="newProjectForm">
      <Formik
        initialValues={{
          title: "",
          desc: "",
          links: "",
        }}
        validationSchema={newProjectSchema}
        onSubmit={(values, actions) => {
          const { links } = values;
          values.links = links.split(",").map((link) => link.trim());
          doCreateProject(values.title, values.desc, values.links)
          actions.resetForm();
          onClose();
        }}
      >
        {(props) => (
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
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

            <Form.Group controlId="formLinks">
              <Form.Label>Any Links (optional)</Form.Label>
              <Form.Control
                onBlur={props.handleBlur("links")}
                value={props.values.links}
                onChange={props.handleChange("links")}
                type="text"
                placeholder="www.example.com, www.yahoo.com"
              />
              <Form.Text className="text-muted">
                Please separate the links using commas
              </Form.Text>
              <Form.Text className="text-danger">
                {props.touched.links && props.errors.links}
              </Form.Text>
            </Form.Group>
            <Button
              variant="outline-danger"
              type="submit"
              size="sm"
              onClick={props.handleSubmit}
            >
              Submit
            </Button>
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Please add details about your project</h5>
        <NewProjectForm onClose={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};
export default NewProjectModal;
