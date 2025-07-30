import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssets } from '../redux/slices/assetSlice';
import { fetchVendors } from '../redux/slices/vendorSlice';
import { addGrns, fetchGrns } from '../redux/slices/grnSlice';

const AddGrn = () => {
  const [show, setShow] = useState(false);
  const [vendorId, setVendorId] = useState('');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [receivedDate, setReceivedDate] = useState('');
  const dispatch=useDispatch()

  const { assetList, loading, error } = useSelector((state) => state.asset)
  const { vendorList } = useSelector((state) => state.vendor)
  const { grnList } = useSelector(state => state.grn);
  

  useEffect(()=>{
    dispatch(fetchVendors())
    dispatch((fetchAssets()))
  },[dispatch])


  const handleClose = () => {
    setShow(false);
    setVendorId('');
    setSelectedAssets([]);
    setReceivedDate('');
  }
  const handleShow = () => setShow(true);

   const addedAssetIds = grnList.flatMap(grn =>
      grn.assetIds.map(asset => asset._id)
    );
  const filteredAssets = vendorId
    ? assetList.filter(asset => asset.vendorId._id === vendorId && !addedAssetIds.includes(asset._id))
    : assetList;


    const handleSubmit = () => {
    if (!vendorId || selectedAssets.length === 0 || !receivedDate) {
      alert("Please fill all fields.");
      return;
    }

    dispatch(addGrns({
      vendorId,
      assetIds: selectedAssets,
      receivedDate
    })).then(() => {
      dispatch(fetchGrns()); 
      handleClose(); 
    })

    
   
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add GRN
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add GRN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Vendor</Form.Label>
              <Form.Select value={vendorId} onChange={(e) => setVendorId(e.target.value)}>
                <option value="">Select Vendor</option>
                {vendorList.map(v => (
                  <option key={v._id} value={v._id}>{v.vendorName}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assets</Form.Label>
              <Form.Select
                multiple
                value={selectedAssets}
                onChange={(e) =>
                  setSelectedAssets(Array.from(e.target.selectedOptions, option => option.value))
                }
              >
                {filteredAssets.map(asset => (
                  <option key={asset._id} value={asset._id}>
                    {asset.assetName} - {asset.assetType}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Received Date</Form.Label>
              <Form.Control
                type="date"
                value={receivedDate}
                onChange={(e) => setReceivedDate(e.target.value)}
              />
            </Form.Group>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddGrn;
