import React, { useState } from "react";
import "../styles/SendQuestion.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

export const SendQuestion = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userQuestion, setUserQuestion] = useState(null);
  const [userName, setUserName] = useState(null);

  function submitForm(e) {
    e.preventDefault();
    if (userEmail && userName && userQuestion) {
      const form = e.target;
      const data = new FormData(form);
      const xhr = new XMLHttpRequest();
      xhr.open(form.method, form.action);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          form.reset();
        } else {
          console.log("ERROR");
        }
      };
      xhr.send(data);
    }
  }

  return (
    <Card id="sendq-card" bg="secondary" text="white">
      <Card.Header id="sendq-header">
        Don't see what you're looking for?
      </Card.Header>
      <Card.Body>
        <Card.Title id="sendq-title">Contact us!</Card.Title>
        <Form
          onSubmit={submitForm}
          action="https://formspree.io/f/xvovkogw"
          method="POST"
        >
          <Container id="sendq-form-container">
            <Row>
              <Col>
                <Form.Group controlId="userName">
                  <Form.Control
                    required
                    placeholder="Enter your name"
                    name="userName"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="userEmail">
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter your email"
                    name="userEmail"
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="userQuestion">
                  <Form.Control
                    as="textarea"
                    required
                    placeholder="Enter a question"
                    name="userQuestion"
                    onChange={(e) => setUserQuestion(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div id="sendq-submit-btn-container">
              <Button variant="light" type="submit">
                Submit
              </Button>
            </div>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
};
