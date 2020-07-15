import React, { useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const URL = 'http://localhost:3001/login';

const LoginPage = props => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      emailAddress: '',
      password: ''
    }
  );

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.post(URL, userInput);
 
    props.history.push('/admin');
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ [name]: value });
  };

  return (
    <Container className="py-4 mt-3" style={{ backgroundColor: '#eee' }}>
      <h3 className="text-uppercase">Login</h3>
      <Form
        onSubmit={handleSubmit}
        className="mt-4 d-flex flex-column align-items-center
      "
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={userInput.emailAddress}
            onChange={handleChange}
            name="emailAddress"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userInput.password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" type="submit">
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
