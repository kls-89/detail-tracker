import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './AppNavbar.css';

const AppNavbar = () => {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand><NavLink to="/">Detail Tracker</NavLink></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink activeClassName="selected" exact to="/">Home</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink activeClassName="selected" exact to="/login">Log In</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink activeClassName="selected" exact to="/admin/agency/new">+Add New Agency</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink activeClassName="selected" exact to="/admin/">Site Administration</NavLink>
          </Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  );
};

export default AppNavbar;
