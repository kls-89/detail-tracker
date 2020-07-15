import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './AppNavbar.css';

const AppNavbar = props => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const handleLogout = () => {
    setUserLoggedIn(false);
    props.history.push('/');
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <NavLink to="/">Detail Tracker</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink activeClassName="selected" exact to="/">
              Home
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <NavLink activeClassName="selected" exact to="/admin/agency/new">
              +Add New Agency1
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink activeClassName="selected" exact to="/admin/">
              Site Administration1
            </NavLink>
          </Nav.Link>
        </Nav>

        <Nav className="ml-auto">
          {!userLoggedIn ? (
            <>
              <Nav.Link>
                <NavLink activeClassName="selected" exact to="/login">
                  Log In
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink activeClassName="selected" exact to="/signup">
                  Sign Up
                </NavLink>
              </Nav.Link>
            </>
          ) : (
            <>
              <p>Welcome Back, UsernameFromState</p>
              <Nav.Link>
                <NavLink
                  activeClassName="selected"
                  className="btn btn-danger"
                  exact
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
