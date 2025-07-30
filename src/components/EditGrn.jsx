import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editGrnStatus } from '../redux/slices/grnSlice';

const EditGrn = ({grn}) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(grn.status);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setStatus(grn.status); 
    setShow(true);
  };
  const dispatch = useDispatch();

   const handleUpdate = () => {
    if (!status) return;

    dispatch(editGrnStatus({ Status: { status }, id: grn._id }))
    handleClose()
   }
  return (
    <>
      <Button variant="warning" size="sm" className="me-2" onClick={handleShow}>
        Edit Status
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit GRN Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Received">✅ Received</option>
                <option value="Pending">⏳ Pending</option>
                <option value="Rejected">❌ Rejected</option>
              </Form.Select>
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditGrn;
