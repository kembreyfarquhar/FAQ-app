import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CustomAlert } from "./CustomAlert";
import axios from "axios";

export const ChangePassword = ({
  changePasswordModal,
  setChangePasswordModal,
}) => {
  const [password, setPassword] = useState({ pass1: "", pass2: "" });
  const [validated, setValidated] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(null);

  function submitPassword(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    if (password.pass1 !== password.pass2) {
      setValidated(false);
      setShowErrorAlert({
        variant: "danger",
        fn: () => setShowErrorAlert(null),
        text: "Passwords don't match.",
      });
      return;
    }

    if (password.pass1 && password.pass2) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/auth/password`,
          { password: password.pass1 },
          {
            headers: {
              authorization: localStorage.getItem("faq_token"),
            },
          }
        )
        .then((res) => {
          setValidated(false);
          setShowSuccessAlert({
            variant: "success",
            text: "Password changed.",
          });
          setChangePasswordModal(false);
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
      <Modal
        show={changePasswordModal}
        onHide={() => setChangePasswordModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={submitPassword}>
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
            Enter new password.
          </Modal.Body>
          <Form.Group
            className="change-password-form"
            controlId="formBasicPassword1"
          >
            <Form.Label>Password: </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter new password"
              onChange={(e) =>
                setPassword({ ...password, pass1: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a new password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="change-password-form"
            controlId="formBasicPassword2"
          >
            <Form.Label>Password: </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter new password again"
              onChange={(e) =>
                setPassword({ ...password, pass2: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a new password.
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setChangePasswordModal(false)}
            >
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
