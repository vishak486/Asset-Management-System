import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button, Spinner } from 'react-bootstrap';
import AddAsset from '../components/AddAsset';
import EditAsset from '../components/EditAsset';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAsset, fetchAssets } from '../redux/slices/assetSlice';

const AssetList = () => {
    const { assetList, loading ,error } = useSelector((state) => state.asset)
    const dispatch=useDispatch()
    const [search,setSearch]=useState('')
    console.log('AssetList data:', assetList, 'Error:', error);

    useEffect(()=>{
        console.log("Dispatching fetchAssets with search:", search);
        dispatch(fetchAssets(search))
    },[search])

    const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB'); // 'dd/mm/yyyy'
};

    
    return (
        <>
            <Header />
            <Container fluid className="py-4 px-5">
                <h3 className="mb-4">Assets</h3>

                {/* Search Bar Only */}
                <Row className="align-items-center mb-3">
                    <Col md={6}>
                        <Form.Control value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search assets..." />
                    </Col>
                    <Col md={6} className="text-end">
                        <AddAsset />
                    </Col>
                </Row>

                {/* Asset Table */}
                {
                loading?(
                     <div className="text-center my-5">
                            <Spinner animation="border" variant="primary" />
                     </div>
                ):(
                     <Table striped bordered hover responsive>
                    <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Purchase Date</th>
                            <th>Price</th>
                            <th>Warranty</th>
                            <th>Vendor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assetList?.map((asset,index)=>(
                        <tr key={asset._id}>
                            <td>{index+1}</td>
                            <td>{asset.assetName}</td>
                            <td>{asset.assetType}</td>
                            <td>{asset.assetDescription}</td>
                            <td>{formatDate(asset.purchaseDate)}</td>
                            <td>₹{asset.purchasePrice}</td>
                            <td>{asset.warranty}</td>
                            <td>{asset.vendorId?.vendorName ?? 'N/A'}</td>
                            <td>
                                <EditAsset asset={asset} />
                                <Button onClick={()=>dispatch(deleteAsset(asset._id))} variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                        ))}
                       
                    </tbody>

                </Table>
                )
                }
               
            </Container>
        </>
    );
};

export default AssetList;
