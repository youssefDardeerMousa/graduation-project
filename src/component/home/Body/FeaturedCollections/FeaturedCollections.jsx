import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import fImg1 from "../../assests/best5 1.png";
import fImg2 from "../../assests/x3_1920x 1.png";
import "./FeaturedCollections.css";

const FeaturedCollections = () => {
  return (
    <Container className="my-5 text-center">
      <Row className="align-items-center">
        <Col xs={12} md={4}>
          <img src={fImg1} alt="Featured Collection 1" className="img-fluid" />
        </Col>
        <Col xs={12} md={4} className="text-section">
          <h5>EXPERIENCE</h5>
          <h2>Featured Collections</h2>
          <p>
            Shopping with The Sill means you’re supported every step of your
            plant parenthood journey. Learn more about our Reward Program.
          </p>
          <Button className="btn" variant="success">
            DISCOVER PRODUCT
          </Button>
        </Col>
        <Col xs={12} md={4}>
          <img src={fImg2} alt="Featured Collection 2" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedCollections;
