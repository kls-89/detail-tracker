import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

const LandingPage = () => {
  const styles = {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1515600496618-e43b0599f518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)',
    backgroundSize: 'cover',
    color: 'white',
    textShadow: '2px 2px 6px black'
  };
  return (
    <Container>
      <Jumbotron style={styles}>
        <h1>Welcome to Detail Tracker</h1>
        <p className="lead">
          A web-based solution to organizing and filling police details.
        </p>
        <p></p>
        <p>
          <Link className="btn btn-primary" to="/admin/agency/new">Admin Sign Up</Link>
        </p>
        <p className="lead">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default LandingPage;
