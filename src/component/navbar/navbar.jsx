import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useApi  } from '../../Context';
import logo from "../../Image/logo.jpg";
import "./navbar.css";

const Navbarbuild = ({ userData, logOut }) => {
  const { cartCount, wishlistCount } = useApi();
  
  const [navbarColor, setNavbarColor] = useState('#FFFFFF');
  const [navbarColor1, setNavbarColor1] = useState('black');
  const [collapsed, setCollapsed] = useState(true);

  const handleScroll = () => {
    const offset = window.scrollY;
    const threshold = 550;
    if (offset > threshold) {
      setNavbarColor('black');
      setNavbarColor1('white');
    } else {
      setNavbarColor('#FFFFFF');
      setNavbarColor1('black');
    }
  };

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest('.navbar') && // Check if the click is not within the navbar
      !collapsed // Check if the menu is already expanded
    ) {
      setCollapsed(true); // Collapse the navbar menu
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [collapsed]);

  const isAuthenticated = userData !== null || localStorage.getItem('SecritData') !== null;

  return (
    <Navbar expand="lg" className="shadow-sm" style={{ backgroundColor: navbarColor, color: navbarColor1 }}>
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex justify-content-center w-25 align-items-center">
          <img
            src={logo}
            width="20"
            height="20"
            className="d-inline-block align-top rounded-circle"
            alt="Clean & Green logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setCollapsed(!collapsed)} />
        <Navbar.Collapse id="basic-navbar-nav" className={`${collapsed ? '' : 'show'}`}>
          {isAuthenticated ? (
            <Nav className="mr-auto custom-nav">
              <NavLink to="/" className="nav-link" style={{ color: navbarColor1 }}>
                Home
              </NavLink>
              <NavLink to="/Products" className="nav-link" style={{ color: navbarColor1 }}>
                Products
              </NavLink>
              
              <NavLink to="/" className="nav-link" style={{ color: navbarColor1 }}>
                About Us
              </NavLink>
              <NavLink to="/contact-us" className="nav-link" style={{ color: navbarColor1 }}>
                Contact Us
              </NavLink>
            </Nav>
          ) : null}

          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <NavLink to="/Register" className="nav-link text-success fw-bold" style={{ color: navbarColor1 }}>
                  Register
                </NavLink>
                <NavLink to="/Login" className="nav-link text-success fw-bold" style={{ color: navbarColor1 }}>
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/wishlist" className="nav-link" style={{ color: navbarColor1 }}>
                  <i className="fa-regular fa-heart icon"></i>
                  {wishlistCount > 0 && <span className="badge bg-success">{wishlistCount}</span>}
                </NavLink>
                <NavLink to="/cart" className="nav-link" style={{ color: navbarColor1 }}>
                  <i className="fa-solid fa-cart-shopping icon"></i>
                  {cartCount > 0 && <span className="badge bg-success">{cartCount}</span>}
                </NavLink>
                {/* <Nav.Link href="#" className="nav-link bg-success" onClick={logOut} style={{ color: navbarColor1 }}>
                  Logout
                </Nav.Link> */}
                <button className="btn btn-success" onClick={logOut} type="submit">
              Logout
            </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarbuild;
