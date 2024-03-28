import { Modal, Button } from "react-bootstrap";
import React from "react";
import "./modal.css";
import { useHistory } from "react-router-dom";
import { doDeleteProject } from "../../Firebase/firebase";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";

import { toast } from "react-toastify";
const DeleteConfirmation = ({ showModal, hideModal, id }) => {
  const { fetchData, projects } = useContext(ProjectContext);
  const history = useHistory();
  const submitDelete = (id) => {
    const photoDetails = projects.filter((value, index) => value.id === id)[0];
    const photoId = photoDetails.projectPhoto;
    const photoName = photoDetails.projectPhotoName;
    var myid = photoId.slice(91)
    myid = myid.slice(0,myid.indexOf('?'))
    doDeleteProject(id, myid, photoName, () => {
      toast("Project deleted successfully");
      history.push("/projects");
      fetchData();
    });
  };
  return (
    <Modal show={showModal} onHide={hideModal} centered>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">
          Are you sure you want to delete this Project?
        </div>
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
