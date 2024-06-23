import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import img1 from "../../assests/2 (1) 1.png";
import img2 from "../../assests/2 (1) 1.png";
import img3 from "../../assests/best8 1.png";
import img4 from "../../assests/best8 1.png";
import img5 from "../../assests/best8 1.png";
import img6 from "../../assests/best8 1.png";
import img7 from "../../assests/best8 1.png";
import img8 from "../../assests/best8 1.png";
import "./BestSeller.css";
import { Button } from "react-bootstrap";

const BestSeller = () => {
  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between">
        <h2 style={{ color: "#145A32" }}>Best Seller</h2>
        <Button variant="link" style={{ color: "#239B56" }}>
          SEE ALL <i class="fa-solid fa-arrow-right"></i>
        </Button>
      </div>
      <div className="horizontal-scroll-container">
        <Row className="flex-nowrap">
          {[img1, img2, img3, img4, img5, img6, img7, img8].map((img, idx) => (
            <Col key={idx} md={3} className="d-flex">
              <Card>
                <Card.Img variant="top" src={img} style={{ height: "400px" }} />
                <Card.Body>
                  <Card.Title className="d-flex justify-content-center text">
                    Type
                  </Card.Title>
                  <Card.Text className="d-flex justify-content-center plant">
                    <h3>Plant {idx + 1}</h3>
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-center price">
                    ${100 + idx * 10}.00
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default BestSeller;
