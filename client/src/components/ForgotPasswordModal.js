import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CustomAlert } from "./CustomAlert";
import axios from "axios";

export const ForgotPasswordModal = ({ modalOpen, setModalOpen }) => {
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(null);

  function submitEmail(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    if (email.length) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/email/${email}`)
        .then((res) => {
          setValidated(false);
          setShowSuccessAlert({
            variant: "success",
            text: "Email sent. It may take a few minutes.",
          });
        })
        .catch((err) => {
          setValidated(false);
          setShowErrorAlert({
            variant: "danger",
            fn: () => setShowErrorAlert(null),
            text: "Oops, something went wrong.",
          });
        });
    }
  }

  return (
    <>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={submitEmail}>
          <Modal.Body>
            {showSuccessAlert && (
              <CustomAlert
                variant={showSuccessAlert.variant}
                text={showSuccessAlert.text}
              />
            )}
            {showErrorAlert && (
              <CustomAlert
                variant={showErrorAlert.variant}
                fn={showErrorAlert.fn}
                text={showErrorAlert.text}
              />
            )}
            Submit your account email address and we'll send you a temporary
            password to sign in with.
          </Modal.Body>
          <Form.Group id="forgot-password-form" controlId="formBasicEmail">
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
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
