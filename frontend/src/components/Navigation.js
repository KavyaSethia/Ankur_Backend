import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Images/logo.png";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <img src={logo} alt="Logo" style={{ height: "50px", width: "auto" }} />
        <LinkContainer to="/">
          <h2 style={{ font: "bold"}}><Navbar.Brand>ANKUR &nbsp;</Navbar.Brand></h2>
        </LinkContainer>
        
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/aboutUs">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/blogs">
              <Nav.Link>Games</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/PandC">
              <Nav.Link>Community Support</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/contactUs">
              <Nav.Link>Contact Us</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
