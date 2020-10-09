import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import axios from "axios";
import logo from "../assets/CircleLogo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Faq } from "./Faq";
require("dotenv").config();

export const Home = (props) => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/faqs/`)
      .then((res) => setFaqs(res.data))
      .catch((err) => console.log("ERROR: ", err));
  }, []);

  return (
    <>
      <Header setIsLoggingIn={props.setIsLoggingIn} />
      <Container>
        {faqs.length && faqs.map((faq) => <Faq key={faq.id} faq={faq} />)}
      </Container>
    </>
  );
};

const Header = (props) => {
  console.log(props);
  return (
    <div id="home-container">
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
    </div>
  );
};
