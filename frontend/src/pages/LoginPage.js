import React from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const LoginPage = () => {
  return (
    <Container className="py-4 mt-3" style={{ backgroundColor: "#eee" }}>
      <h3 className="text-uppercase">Login</h3>
      <Form className="mt-4 d-flex flex-column align-items-center
      ">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />

        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
      </Button>
      </Form>
      <div className="mt-5">
        <Form.Text className="text-muted">
          Don't have an account? Create one here.
        </Form.Text>
        <Link to="/admin/agency/new" className="btn btn-success" type="submit">
          Sign Up
      </Link>
      </div>
    </Container>
  );
};

export default LoginPage;
