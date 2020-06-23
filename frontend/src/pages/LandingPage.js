import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const LandingPage = () => {
  const styles = {
    // background image source: https://unsplash.com/photos/cWpxm3Nmnlo
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
          <Button variant="primary">Admin Sign Up</Button>
        </p>
        <p className="lead">
          Already have an account? <Link>Log in</Link>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default LandingPage;
