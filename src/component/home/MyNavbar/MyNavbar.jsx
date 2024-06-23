import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import logo from "../../../assests/logo.jpg";
import { NavLink } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-5">
      <Container fluid className="px-5">
        <NavLink to="/" className="d-flex align-items-center">
          <img
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-top rounded-circle"
            alt="Clean & Green logo"
          />
          <span className="mx-3 fw-bold text-success">Clean & Green</span>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-between align-items-center"
        >
          <Nav className="mr-auto custom-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/contact-us">Contact Us</NavLink>
          </Nav>
          <Form inline className="d-flex">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2 rounded-pill"
            />
            <Button variant="outline-success" className="rounded-pill">
              Search
            </Button>
          </Form>
          <Nav>
            <Nav.Link href="#account" className="ml-3">
              <i className="fas fa-user-circle fa-2x"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
