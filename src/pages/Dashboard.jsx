import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardCount } from '../redux/slices/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, vendorCount, assetCount, grnCount } = useSelector(
    (state) => state.dashboard
  );

  useEffect(()=>{
    dispatch(fetchDashboardCount())
  },[dispatch])

  return (
    <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Header />

      <Container className="py-4">
        <h2 className="mb-4">Welcome, Admin!</h2>

       {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

         {!loading && !error && (
          <Row>
            <Col md={6} lg={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Total Assets</Card.Title>
                  <Card.Text>{assetCount} items</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Pending GRNs</Card.Title>
                  <Card.Text>{grnCount} pending</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Total Vendors</Card.Title>
                  <Card.Text>{vendorCount} vendors</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
