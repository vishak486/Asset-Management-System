import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button, Spinner } from 'react-bootstrap';
import Header from '../components/Header';
import AddGrn from '../components/AddGrn';
import EditGrn from '../components/EditGrn';

import { useDispatch, useSelector } from 'react-redux';
import { deleteGrns, fetchGrns } from '../redux/slices/grnSlice';
import GrnDetails from '../components/GrnDetails';

const GrnList = () => {
  const dispatch = useDispatch();
  const { grnList, loading, error } = useSelector(state => state.grn);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchGrns(searchTerm));
  }, [dispatch, searchTerm]);


  return (
    <>
      <Header />
      <Container fluid className="py-4 px-5">
        <h3 className="mb-4">GRN List</h3>

        {/* Search and Add Button */}
        <Row className="align-items-center mb-3">
          <Col md={6}>
            <Form.Control value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search GRNs..." />
          </Col>
          <Col md={6} className="text-end">
            <AddGrn />
          </Col>
        </Row>

        {/* GRN Table */}
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>GRN Number</th>
              <th>Vendor</th>
              <th>Assets</th>
              <th>Received Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ?
                (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </td>
                  </tr>
                ) : error ?
                  (
                    <tr>
                      <td colSpan="7" className="text-center text-danger">{error}</td>
                    </tr>
                  ) :
                  (
                    grnList.map((grn, index) => (
                      <tr key={grn._id}>
                        <td>{index + 1}</td>
                        <td>{grn.grnNumber}</td>
                        <td>{grn.vendorId.vendorName}</td>
                        <td>
                          {grn.assetIds.map(asset => asset.assetName).join(', ')}
                        </td>
                        <td>{new Date(grn.receivedDate).toLocaleDateString()} </td>
                        <td>{grn.status}</td>
                        <td>
                          <EditGrn grn={grn} />
                          <Button onClick={() => dispatch(deleteGrns(grn._id))} variant="danger" size="sm" className="ms-2">Delete</Button>
                          <GrnDetails grn={grn} />
                        </td>
                      </tr>
                    ))
                  )
            }
          </tbody>


        </Table>
      </Container>
    </>
  );
};

export default GrnList;
