import React from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import slider1 from "../../home/assests/1 (1) 1.png";
import slider2 from "../../home/assests/c1 1.png";

const HeroSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={slider1} alt="First slide" />
        <Carousel.Caption>
          <Container className="text-center">
            <h1 style={{ color: "#27AE60", fontSize: "2.5rem" }}>WITH</h1>
            <h2
              style={{
                color: "#FBFCFC",
                fontSize: "4rem",
                marginBottom: "1rem",
              }}
            >
              Clean & Green
            </h2>
            <p
              style={{
                color: "#FBFCFC",
                fontSize: "2rem",
                marginBottom: "2rem",
              }}
            >
              Your Life Like a Dream
            </p>
            <Button
              variant="success"
              style={{
                backgroundColor: "#27AE60",
                borderColor: "#20C997",
                fontSize: "1.2rem",
                padding: "0.8rem 2rem",
              }}
            >
              Discover All
            </Button>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slider2} alt="Second slide" />
        <Carousel.Caption>
          <Container className="text-center">
            <h1 style={{ color: "#20C997", fontSize: "2.5rem" }}>WITH</h1>
            <h2
              style={{
                color: "#FBFCFC",
                fontSize: "4rem",
                marginBottom: "1rem",
              }}
            >
              Clean & Green
            </h2>
            <p
              style={{
                color: "#FBFCFC",
                fontSize: "2rem",
                marginBottom: "2rem",
              }}
            >
              Your Life Like a Dream
            </p>
            <Button
              variant="success"
              style={{
                backgroundColor: "#20C997",
                borderColor: "#20C997",
                fontSize: "1.2rem",
                padding: "0.8rem 2rem",
              }}
            >
              Discover All
            </Button>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSection;
