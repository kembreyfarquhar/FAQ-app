import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import axios from "axios";
import logo from "../assets/CircleLogo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/esm/Card";
import { Faq } from "./Faq";
import { FaqForm } from "./FaqForm";
import { CustomAlert } from "./CustomAlert";

const dotenv = require("dotenv").config();

export const Home = (props) => {
  const { setIsLoggingIn, isAdmin, setIsAdmin } = props;
  const [faqs, setFaqs] = useState([]);
  const [saveAlert, setSaveAlert] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/faqs/`)
      .then((res) => {
        res.data.sort((a, b) => {
          return a.id - b.id;
        });
        setFaqs(res.data);
      })
      .catch((err) => console.log("ERROR: ", err));
  }, []);

  return (
    <>
      <Header
        setIsLoggingIn={setIsLoggingIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <Container id="faqs-container">
        {faqs.length &&
          faqs.map((faq) => <Faq key={faq.id} faq={faq} isAdmin={isAdmin} />)}
        {isAdmin && (
          <Card className="faq-card">
            {saveAlert && (
              <CustomAlert
                variant={saveAlert.variant}
                fn={saveAlert.fn}
                text={saveAlert.text}
              />
            )}
            <Card.Title>Add a new FAQ</Card.Title>
            <FaqForm setSaveAlert={setSaveAlert} />
          </Card>
        )}
      </Container>
    </>
  );
};

const Header = (props) => {
  const { setIsLoggingIn, isAdmin, setIsAdmin } = props;
  return (
    <div id="home-container">
      <Row>
        <Col>
          <Image src={logo} id="home-logo" />
        </Col>
        <Col style={{ textAlign: "right" }}>
          <p
            id="login-logout-button"
            onClick={() => {
              if (isAdmin) {
                localStorage.removeItem("faq_token");
                setIsAdmin(false);
              } else {
                setIsLoggingIn(true);
              }
            }}
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
