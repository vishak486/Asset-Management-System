import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';


const Login = () => {

  const [loginDetails, setLoginDetails] = useState({
    email: "", password: ""
  })

   const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
   const dispatch = useDispatch();
  const navigate = useNavigate();



  const { loading, error } = useSelector((state) => state.auth);

 const handleValidation = () => {
  let emailError = '';
  let passwordError = '';

  if (!loginDetails.email) {
    emailError = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(loginDetails.email)) {
    emailError = 'Invalid email format';
  }

  if (!loginDetails.password) {
    passwordError = 'Password is required';
  } else if (loginDetails.password.length < 6) {
    passwordError = 'Password must be at least 6 characters';
  }

  setErrors({
    email: emailError,
    password: passwordError
  });

  return !(emailError || passwordError); // return true if no errors
};  

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const isValid = handleValidation();
    if (!isValid) return;
    try
    {
        const result=await dispatch(loginUser(loginDetails))
        if(result)
        {
          navigate('/dashboard')
        }
    }
    catch(err)
    {
      console.log(err);
      
    }

  }

  return (
    <>
      <div className='d-flex align-items-center justify-content-center' style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',

      }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <Card className="p-4 shadow-lg rounded-4" style={{ backgroundColor: '#ffffffcc', backdropFilter: 'blur(10px)' }}>
                <h3 className="text-center mb-4 text-primary">Welcome Admin</h3>
                <p className="text-center mb-4 text-muted">Please login to continue</p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      className="rounded-pill"
                      value={loginDetails.email}
                      onChange={e => setLoginDetails({ ...loginDetails, email: e.target.value })}
                      isInvalid={!!errors.email}
                    />
                    {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      className="rounded-pill"
                      value={loginDetails.password}
                      onChange={e => setLoginDetails({ ...loginDetails, password: e.target.value })}
                      isInvalid={!!errors.password}
                    />
                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                  </Form.Group>


                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 rounded-pill"
                    disabled={loading}
                  >
                  {loading ? "Logging in..." : "Login"}
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
