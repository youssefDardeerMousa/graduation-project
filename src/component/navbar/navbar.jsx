import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useApi } from '../../Context';
import logo from "../../Image/logo.jpg";
import "./navbar.css";

const Navbarbuild = () => {
  const { cartCount, wishlistCount } = useApi();

  return (
    <Navbar expand="lg" className=" shadow-sm">
      <Container fluid className="">
        <Navbar.Brand href="/" className="d-flex justify-content-center w-25 align-items-center">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top rounded-circle"
            alt="Clean & Green logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto custom-nav">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/Products" className="nav-link" active>
              Products
            </NavLink>
            <NavLink to="/" className="nav-link">
              Blog
            </NavLink>
            <NavLink to="/" className="nav-link">
              About Us
            </NavLink>
            <NavLink to="/contact-us" className="nav-link">
              Contact Us
            </NavLink>
          </Nav>

          <Nav className="ms-auto">
            <NavLink to="/wishlist" className="nav-link">
              <i className="fa-regular fa-heart icon"></i>
              {wishlistCount > 0 && <span className="badge bg-success">{wishlistCount}</span>}
            </NavLink>

            <NavLink to="/cart" className="nav-link">
              <i className="fa-solid fa-cart-shopping icon"></i>
              {cartCount > 0 && <span className="badge bg-success">{cartCount}</span>}
            </NavLink>
            <button className="btn btn-success" type="submit">
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarbuild;
