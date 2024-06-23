import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import contact from "../../assests/x3_1920x 1.png";
import products from "../../assests/z9 1.png";
import "./Support.css";

const Support = () => {
  return (
    <Container className="my-5">
      <div className="textOne">
        <h5>Support</h5>
        <h2>We're here to help</h2>
      </div>

      <Row>
        <Col>
          <p>Need assistance? Give us a call.</p>
          <p>+20 01112880371</p>
          <p>
            Every Day <span>9:00 AM - 10:00 PM</span>
          </p>
          <p>
            Friday <span>3:00 PM - 10:00 PM</span>
          </p>
          <p>UTC +2 / Egypt Standard</p>
        </Col>
        <Col>
          <img
            src={contact}
            alt="Contact"
            className="img-fluid"
            style={{ marginTop: "-80px" }}
          />
        </Col>
        <Col>
          <img
            src={products}
            alt="Our Products"
            className="img-fluid"
            style={{ marginTop: "-80px" }}
          />
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default Support;
