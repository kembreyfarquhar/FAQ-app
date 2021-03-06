import React, { useState } from "react";
import "../styles/Login.css";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { CustomAlert } from "./CustomAlert";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function logIn(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    if (email.length && password.length) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("faq_token", res.data.token);
          props.setIsAdmin(true);
          props.setIsLoggingIn(false);
        })
        .catch((err) => {
          let errMessage;
          if (err.hasOwnProperty("response")) {
            errMessage = err.response.data.message;
          }
          setRequestError(errMessage || "Something went wrong");
          setValidated(false);
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

  return (
    <div id="login-page">
      <Button variant="secondary" type="button" onClick={goBack}>
        Go Back
      </Button>
      <Container id="login-container">
        {requestError && (
          <CustomAlert
            variant="danger"
            fn={() => setRequestError(null)}
            text={requestError}
          />
        )}
        {modalOpen && (
          <ForgotPasswordModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        )}
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
        <div id="login-forgot-password">
          <span onClick={() => setModalOpen(true)} id="forgot-password-text">
            Forgot Password
          </span>
        </div>
      </Container>
    </div>
  );
};
