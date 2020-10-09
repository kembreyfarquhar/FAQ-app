import React, { useState, useEffect } from "react";
import "../styles/Faq.css";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const Faq = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card id="faq-card">
      <Row>
        <Col xs={10} id="faq-question-col">
          <h3>{faq.question}</h3>
        </Col>
        <div id="faq-collapse-col">
          <Button
            id="faq-collapse-btn"
            variant="light"
            onClick={() => setOpen(!open)}
          >
            {open ? "-" : "+"}
          </Button>
        </div>
      </Row>
      <Collapse in={open}>
        <div>{faq.answer}</div>
      </Collapse>
    </Card>
  );
};
