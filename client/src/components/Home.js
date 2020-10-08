import React, { useState } from "react";
import logo from "../assets/CircleLogo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../styles/Home.css";

export const Home = (props) => {
  return (
    <Container id="home-container">
      <Row>
        <Col>
          <Image src={logo} id="home-logo" />
        </Col>
        <Col style={{ textAlign: "right" }}>
          <p
            id="login-logout-button"
            onClick={() => props.setIsLoggingIn(true)}
          >
            {props.isAdmin ? "Logout" : "Admin"}
          </p>
        </Col>
      </Row>
      <Row id="faq-heading-row">
        <h1 id="faq-heading">Frequently Asked Questions</h1>
      </Row>
    </Container>
  );
};
