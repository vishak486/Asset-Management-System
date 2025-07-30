import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addVendors } from '../redux/slices/vendorSlice';


function AddVendor() {
  const [show, setShow] = useState(false);
  const [vendorDetails, setVendorDetails] = useState({
    vendorName: "", contactPerson: "", email: "", phone: "", address: ""
  })
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch()


  const handleClose = () => {
    setVendorDetails({ vendorName: "", contactPerson: "", email: "", phone: "", address: "" })
    setShow(false);
    setErrors({})
  }
  const handleShow = () => setShow(true);

  const validate = () => {
    const newErrors = {};
    if (!vendorDetails.vendorName.trim()) {
      newErrors.vendorName = "Vendor name is required";
    }
    if (!vendorDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(vendorDetails.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!vendorDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(vendorDetails.phone)) {
      newErrors.phone = "Phone number should be 10 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const result = await dispatch(addVendors(vendorDetails));
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Vendor
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control value={vendorDetails.vendorName} onChange={e => setVendorDetails({ ...vendorDetails, vendorName: e.target.value })} type="text" isInvalid={!!errors.vendorName} placeholder="Enter vendor name" />
              {errors.vendorName && <Form.Text className="text-danger">{errors.vendorName}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control value={vendorDetails.contactPerson} onChange={e => setVendorDetails({ ...vendorDetails, contactPerson: e.target.value })} type="text" placeholder="Enter Contact Person name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control value={vendorDetails.email} onChange={e => setVendorDetails({ ...vendorDetails, email: e.target.value })} type="email" isInvalid={!!errors.email} placeholder="Enter email" />
              {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control value={vendorDetails.phone} onChange={e => setVendorDetails({ ...vendorDetails, phone: e.target.value })} type="text" placeholder="Enter phone number" />
              {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control value={vendorDetails.address} onChange={e => setVendorDetails({ ...vendorDetails, address: e.target.value })} type="text" placeholder="Enter Address" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Vendor
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddVendor;
