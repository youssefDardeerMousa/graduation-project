import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import deliveryIcon from "../../home/assests/SVG_Convenience 1.png";
import plantParentingIcon from "../../home//assests/best8 1.png";

const PromoSection = () => {
  return (
    <Container className="text-center p-5 bg-white rounded">
      <h1 style={{ color: "#145A32" }}>
        Refresh your home for the season with fully-grown, potted plants
        delivered to your door.
      </h1>
      <Button
        variant="success"
        className="my-3"
        style={{
          backgroundColor: "#145A32",
          borderColor: "#145A32",
          width: "160px",
          height: "50px",
          fontWeight: "bold",
        }}
      >
        LEARN MORE
      </Button>
      <Row className="m-4 d-flex justify-content-between">
        <Col
          md={5}
          className="d-flex align-items-center border rounded shadow p-3"
        >
          <img
            src={deliveryIcon}
            alt="Delivery Icon"
            style={{ width: "60px", height: "80px", marginRight: "15px" }}
          />
          <p className="mb-0 text-secondary">
            Delivery to your door We'll bring your plants to your door, anywhere
            in GB
          </p>
        </Col>
        <Col
          md={5}
          className="d-flex align-items-center border rounded shadow p-3"
        >
          <img
            src={plantParentingIcon}
            alt="Plant Parenting Icon"
            style={{ width: "60px", height: "80px", marginRight: "15px" }}
          />
          <p className="mb-0 text-secondary">
            All the help you need We'll send you a free plant-parenting course
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PromoSection;
