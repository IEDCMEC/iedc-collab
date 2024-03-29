import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import "./modal.css";
import { useHistory } from "react-router-dom";
import { doDeleteProject } from "../../Firebase/firebase";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { toast } from "react-toastify";

const DeleteConfirmation = ({ showModal, hideModal, id }) => {
  const { fetchData, projects } = useContext(ProjectContext);
  const history = useHistory();
  const [projectName, setProjectName] = useState("");

  const photoDetails = projects.find((value) => value.id === id);
  let actualProjectName = '';
  if (photoDetails) {
    actualProjectName = photoDetails.name.trim();
  }
  
  const submitDelete = (id) => {
    
    if (!photoDetails) return;
  
    const enteredProjectName = projectName.trim();
  
    if (enteredProjectName === actualProjectName) {
      const photoId = photoDetails.projectPhoto;
      const photoName = photoDetails.projectPhotoName;
      const myid = photoId.slice(91, photoId.indexOf('?'));
      
      doDeleteProject(id, myid, photoName, () => {
        toast("Project deleted successfully");
        history.push("/projects");
        fetchData();
        hideModal();
      });
    } else {
      toast.error("Project name does not match. Please enter the correct project name.");
    }
  };
  
  return (
    <Modal show={showModal} onHide={hideModal} centered>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Do you want to delete your project?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="alert alert-danger">
        Are you sure you want to delete <strong>{actualProjectName}</strong>?
      </div>
        <Form.Group controlId="projectName">
          <Form.Label>Please type the exact project name to confirm:</Form.Label>
          <Form.Control
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => submitDelete(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;