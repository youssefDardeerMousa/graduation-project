import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import secImg from "../../../component/home/assests/best7 (1) 1.png";

const PlantCare = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <p style={{ color: "#239B56" }}>Plant Care</p>
          <h3
            style={{
              color: "#145A32",
            }}
            className="fw-semibold"
          >
            A Houseplant’s <br /> Journey Home
          </h3>
          <p className="mt-3 text-body-secondary">
            Follow along on a Bird of Paradise's trip from our greenhouse to
            your home, and see how we care for your plant along the journey.
          </p>
          <Button variant="link" style={{ color: "#239B56" }}>
            READ MORE <i class="fa-solid fa-arrow-right"></i>
          </Button>
        </Col>
        <Col>
          <img
            src={secImg}
            alt="Plant Care"
            className="img-fluid mx-5 careImg rounded-3"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PlantCare;
