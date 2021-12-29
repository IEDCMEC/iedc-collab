import { Modal, Button } from "react-bootstrap";
import React from "react";
import "./modal.css";

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id }) => {
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
        <Button
          variant="danger"
          onClick={() => {
            confirmModal(id);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteConfirmation;
