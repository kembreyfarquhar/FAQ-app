import React, { useState } from "react";
import "../styles/Login.css";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [requestError, setRequestError] = useState(null);

  function logIn(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    if (email.length && password.length) {
      axios
        .post("http://localhost:4000/api/auth/login", { email, password })
        .then((res) => {
          console.log("SUCCESS", res.data);
          localStorage.setItem("faq_token", res.data.token);
          props.setIsLoggingIn(false);
        })
        .catch((err) => {
          console.log("ERROR", err.response.data);
          setRequestError({
            status: err.response.status,
            message: err.response.data.error,
          });
        });
    }
  }

  function goBack() {
    props.setIsLoggingIn(false);
    setEmail("");
    setPassword("");
    setValidated(false);
    setRequestError(null);
  }

  function showAlert() {
    if (requestError) {
      return (
        <Alert
          variant="danger"
          onClose={() => setRequestError(null)}
          dismissible
        >
          {requestError.message}
        </Alert>
      );
    }
  }

  return (
    <div id="login-page">
      <Button variant="secondary" type="button" onClick={goBack}>
        Go Back
      </Button>
      <Container id="login-container">
        {showAlert()}
        <h2 id="login-heading">Admin Login</h2>
        <Form noValidate validated={validated} onSubmit={logIn}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" id="login-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" block type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};
