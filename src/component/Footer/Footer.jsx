import React from "react";
  import logo from "./logo.jpg";
import { NavLink } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer py-4 mt-auto">
      <div className="container ">
        <div className="row d-flex justify-content-between">
          <div className="col-md-6 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={logo}
                alt="Clean & Green Logo"
                className="rounded-circle logoF"
                s
                width="60"
                height="60"
              />
              <h5 className="ml-3 textF">Clean & Green</h5>
            </div>
            <p className="paraF">
              Clean & Green is an online store website for Rooftop cultivation
              products and tools.
            </p>
            <div className="d-flex">
              <NavLink to="/" className="socialF mr-3">
                <i className="fab fa-facebook-square fa-2x me-2"></i>
              </NavLink>
              <NavLink to="/" className="socialF mr-3">
                <i className="fab fa-instagram fa-2x me-2"></i>
              </NavLink>
              <NavLink to="/" className="socialF mr-3">
                <i className="fab fa-telegram fa-2x me-2"></i>
              </NavLink>
              <NavLink to="/" className="socialF">
                <i className="fab fa-twitter fa-2x me-2"></i>
              </NavLink>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="textFH">References</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink href="/" className="textL">
                  <i class="fa-solid fa-angles-right iconF"></i>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink href="/products" className="textL">
                  <i class="fa-solid fa-angles-right iconF"></i>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink href="/blog" className="textL">
                  <i class="fa-solid fa-angles-right iconF"></i>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink href="/about-us" className="textL">
                  <i class="fa-solid fa-angles-right iconF"></i>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink href="/contact-us" className="textL">
                  <i class="fa-solid fa-angles-right iconF"></i>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="text-center mt-4">
          <p className="finalF">
            <sapn className="copyIcon">&copy;</sapn> 2024, Clean & Green.
            Powered by Clean & Green Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
