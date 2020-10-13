import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { successReload } from "./CustomAlert";

export const FaqForm = (props) => {
  let initialState;
  if (props.faq) {
    initialState = {
      question: props.faq.question,
      answer: props.faq.answer,
    };
  } else {
    initialState = {
      question: "",
      answer: "",
    };
  }
  const [faq, setFaq] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  function saveEdit() {
    axios
      .put(`${process.env.REACT_APP_API_URL}/faqs/${props.faq.id}`, faq, {
        headers: {
          authorization: localStorage.getItem("faq_token"),
        },
      })
      .then(() => {
        props.setEditAlert({
          variant: "success",
          text: "Successfully updated.",
        });
        setButtonState(true);
        successReload();
      })
      .catch(() => {
        props.setEditAlert({
          variant: "danger",
          fn: () => props.setEditAlert(null),
          text: "Oops, something went wrong.",
        });
        setButtonState(false);
        props.setEditing(false);
        setValidated(false);
      });
  }

  function saveNewFaq() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/faqs/`, faq, {
        headers: {
          authorization: localStorage.getItem("faq_token"),
        },
      })
      .then(() => {
        props.setSaveAlert({
          variant: "success",
          text: "Successfully saved new FAQ.",
        });
        setButtonState(true);
        successReload();
      })
      .catch(() => {
        props.setSaveAlert({
          variant: "danger",
          fn: () => props.setSaveAlert(null),
          text: "Oops, something went wrong.",
        });
        setButtonState(false);
        setValidated(false);
      });
  }

  function cancelAndSubmitBtns() {
    return (
      <Row>
        <Col>
          {props.hasOwnProperty("editing") && (
            <Button
              variant="secondary"
              type="button"
              onClick={() => props.setEditing(false)}
              disabled={buttonState}
            >
              Cancel
            </Button>
          )}{" "}
          <Button variant="primary" type="submit" disabled={buttonState}>
            Submit
          </Button>
        </Col>
      </Row>
    );
  }

  function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    if (faq.question.length && faq.answer.length) {
      if (props.hasOwnProperty("editing")) {
        saveEdit();
      } else {
        saveNewFaq();
      }
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={submit}>
      <Form.Group controlId="formQuestion">
        <Form.Control
          defaultValue={faq && faq.question}
          required
          placeholder="Enter a question"
          onChange={(e) => setFaq({ ...faq, question: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a question.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formAnswer">
        <Form.Control
          as="textarea"
          defaultValue={faq && faq.answer}
          required
          placeholder="Enter an answer"
          onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          Please enter an answer.
        </Form.Control.Feedback>
      </Form.Group>
      {cancelAndSubmitBtns()}
    </Form>
  );
};
