import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import React, { useState } from 'react'
import { Card, Table, Badge, Button, Modal } from "react-bootstrap";

const GrnDetails = ({ grn }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDownload = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(`Goods Receipt Note (GRN)`, 14, 20);

        doc.setFontSize(12);
        doc.setTextColor(255, 0, 0);
        doc.text(`GRN Number: ${grn.grnNumber}`, 14, 30);
        doc.setTextColor(0, 128, 0);
        doc.text(`Status: ${grn.status}`, 14, 38);
        doc.setTextColor(0, 0, 255);
        doc.text(`Received Date: ${new Date(grn.receivedDate).toLocaleDateString()}`, 14, 46);

        doc.setTextColor(0, 0, 0);
        doc.text(`\nVendor Details:`, 14, 55);
        doc.text(`Name: ${grn.vendorId.vendorName}`, 14, 66);
        doc.text(`Contact: ${grn.vendorId.contactPerson}`, 14, 74);
        doc.text(`Email: ${grn.vendorId.email}`, 14, 82);
        doc.text(`Phone: ${grn.vendorId.phone}`, 14, 90);
        doc.text(`Address: ${grn.vendorId.address}`, 14, 98);

        // Asset Table
        const assetRows = grn.assetIds.map((asset, index) => [
            index + 1,
            asset.assetName,
            asset.assetType,
            asset.assetDescription,
            new Date(asset.purchaseDate).toLocaleDateString(),
            asset.purchasePrice,
            asset.warranty,
        ]);

        autoTable(doc, {
            startY: 110,
            head: [['#', 'Asset Name', 'Type', 'Description', 'Purchase Date', 'Price', 'Warranty']],
            body: assetRows,
            theme: 'striped',
        });

        doc.save(`GRN-${grn.grnNumber}.pdf`);
    };
    return (
        <>
            <Button variant="success" size="sm" className="me-2 ms-2" onClick={handleShow}>
                View Details
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>GRN Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="mb-4 shadow">
                        <Card.Header>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">GRN: {grn.grnNumber}</h5>
                                <Badge bg={grn.status === "Received" ? "success" : "warning"}>
                                    {grn.status === "Received" ? "✅ Received" : "⏳ Pending"}
                                </Badge>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <h6 className="text-muted mb-2">Vendor Information</h6>
                            <p><strong>Name:</strong> {grn.vendorId.vendorName}</p>
                            <p><strong>Contact:</strong> {grn.vendorId.contactPerson}</p>
                            <p><strong>Email:</strong> {grn.vendorId.email}</p>
                            <p><strong>Phone:</strong> {grn.vendorId.phone}</p>
                            <p><strong>Address:</strong> {grn.vendorId.address}</p>

                            <hr />

                            <h6 className="text-muted mb-2">Asset Details</h6>
                            <Table bordered responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Asset Name</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                        <th>Purchase Date</th>
                                        <th>Price</th>
                                        <th>Warranty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grn.assetIds.map((asset, idx) => (
                                        <tr key={asset._id}>
                                            <td>{idx + 1}</td>
                                            <td>{asset.assetName}</td>
                                            <td>{asset.assetType}</td>
                                            <td>{asset.assetDescription}</td>
                                            <td>{new Date(asset.purchaseDate).toLocaleDateString()}</td>
                                            <td>₹{asset.purchasePrice}</td>
                                            <td>{asset.warranty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <p><strong>Received Date:</strong> {new Date(grn.receivedDate).toLocaleDateString()}</p>

                            {grn.status === "Received" && (
                                <div className="text-end">
                                    <Button variant="primary" onClick={handleDownload}>
                                        📄 Download GRN
                                    </Button>
                                </div>
                            )}

                        </Card.Body>
                    </Card>

                </Modal.Body>

            </Modal>


        </>
    )
}

export default GrnDetails