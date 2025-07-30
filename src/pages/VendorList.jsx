import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, Table, Spinner } from 'react-bootstrap';
import AddVendor from '../components/AddVendor';
import EditVendor from '../components/EditVendor';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVendor, fetchVendors } from '../redux/slices/vendorSlice';


const VendorList = () => {

    const dispatch = useDispatch()
    const { vendorList, loading ,error } = useSelector((state) => state.vendor)
    const [search,setSearch]=useState('')

    useEffect(()=>{
        dispatch(fetchVendors(search))
    },[search])
    // console.log(search);
    

    // console.log(error);
 if (error) return <p>Error: {error}</p>;


    return (
        <>
            <Header />
            <Container fluid className="py-4 px-5">
                <h3 className="mb-4">Vendors</h3>

                {/* Search and Add Button */}
                <Row className="align-items-center mb-3">
                    <Col md={6}>
                        <Form.Control value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search vendors..." />
                    </Col>
                    <Col md={6} className="text-end">
                        <AddVendor />
                    </Col>
                </Row>
                

                {/* Vendor Table */}
                {
                    loading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )
                        : (
                            <Table striped bordered hover responsive>
                                <thead className="table-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Vendor Name</th>
                                        <th>contactPerson</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                 <tbody>
                            {vendorList?.map((vendor, index) => (
                                <tr key={vendor._id}>
                                    <td>{index + 1}</td>
                                    <td>{vendor.vendorName}</td>
                                    <td>{vendor.contactPerson}</td>
                                    <td>{vendor.email}</td>
                                    <td>{vendor.phone}</td>
                                    <td>{vendor.address}</td>
                                    <td>
                                        <EditVendor vendor={vendor} />
                                        <Button onClick={()=>dispatch(deleteVendor(vendor._id))} className='ms-2' variant="danger" size="sm">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                            </Table>
                        )
                }

            </Container>
        </>
    )
}

export default VendorList