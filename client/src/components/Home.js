import React, { useState } from "react";
import logo from "../assets/CircleLogo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export const Home = (props) => {
  return (
    <Container style={{ border: "1px solid red", paddingTop: "15px" }}>
      <Row>
        <Col>
          <Image src={logo} style={{ height: "100px", width: "100px" }} />
        </Col>
        <Col style={{ textAlign: "right" }}>
          <p onClick={() => props.setIsLoggingIn(true)}>Admin</p>
        </Col>
      </Row>
    </Container>
  );
};
