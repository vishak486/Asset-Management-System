import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Header = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleLogout=()=>{
    dispatch(logout())
    navigate("/")
  }
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="fs-4 text-white">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto fs-5">
            <Nav.Link href="/dashboard" className="text-white">Home</Nav.Link>
            <Nav.Link href="/vendors" className="text-white">Vendors</Nav.Link>
            <Nav.Link href="/assets" className="text-white">Assets</Nav.Link>
            <Nav.Link href="/grns" className="text-white">Grns</Nav.Link>
            <Nav.Link onClick={handleLogout} className="text-white" style={{ cursor: "pointer" }} >Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
