import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import './modal.css';
import PropTypes from 'prop-types';

function DeleteConfirmation({ showModal, hideModal, confirmModal, id }) {
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
}

DeleteConfirmation.propTypes = {
  showModal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  confirmModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteConfirmation;
