import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addAssets, fetchAssets } from '../redux/slices/assetSlice';
import { fetchVendors } from '../redux/slices/vendorSlice';

const AddAsset = () => {
  const [show, setShow] = useState(false);
  const [assetDetails,setAssetDetails]=useState({
    assetName: "",assetType:"",assetDescription:"",purchaseDate:"",purchasePrice:"",warranty:"",vendorId:""
  })

  const handleClose = () => {
    setAssetDetails({assetName: "",assetType:"",assetDescription:"",purchaseDate:"",purchasePrice:"",warranty:"",vendorId:""})
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { vendorList } = useSelector((state) => state.vendor);

  useEffect(()=>{
    dispatch(fetchVendors())
  },[dispatch])
  

  const handleSubmit=()=>{
    const {assetName,assetType,assetDescription,purchaseDate,purchasePrice,warranty,vendorId}=assetDetails
    if(!assetName || !assetType || !assetDescription || !purchaseDate || !purchasePrice || !warranty || !vendorId)
      {
        alert("Please fill all the fields")
      }
      else
      {
        dispatch(addAssets(assetDetails)).then(()=>{
          dispatch(fetchAssets())
        })
        handleClose();
      }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Asset
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="assetName">
              <Form.Label>Asset Name</Form.Label>
              <Form.Control value={assetDetails.assetName} onChange={e=>setAssetDetails({...assetDetails,assetName:e.target.value})} type="text" placeholder="Enter asset name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="assetType">
              <Form.Label>Asset Type</Form.Label>
              <Form.Control value={assetDetails.assetType} onChange={e=>setAssetDetails({...assetDetails,assetType:e.target.value})} type="text" placeholder="Enter type (e.g., Electronics)" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="assetDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control value={assetDetails.assetDescription} onChange={e=>setAssetDetails({...assetDetails,assetDescription:e.target.value})} type="text" placeholder="Enter description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="purchaseDate">
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control value={assetDetails.purchaseDate} onChange={e=>setAssetDetails({...assetDetails,purchaseDate:e.target.value})} type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="purchasePrice">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control value={assetDetails.purchasePrice} onChange={e=>setAssetDetails({...assetDetails,purchasePrice:e.target.value})} type="number" placeholder="₹" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="warranty">
              <Form.Label>Warranty</Form.Label>
              <Form.Control value={assetDetails.warranty} onChange={e=>setAssetDetails({...assetDetails,warranty:e.target.value})} type="text" placeholder="e.g., 1 year" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="vendor">
              <Form.Label>Vendor</Form.Label>
              <Form.Select value={assetDetails.vendorId} onChange={e=>setAssetDetails({...assetDetails,vendorId:e.target.value})}>
                  <option value="">Select Vendor</option>
                {vendorList?.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.vendorName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAsset;
