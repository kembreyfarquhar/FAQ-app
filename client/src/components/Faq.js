import React, { useState, useEffect } from "react";
import "../styles/Faq.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomAlert } from "./CustomAlert";
import { FaqForm } from "./FaqForm";

export const Faq = (props) => {
  const { faq, isAdmin } = props;
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [editAlert, setEditAlert] = useState(null);
  const [editing, setEditing] = useState(false);

  function deleteFAQ(e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/faqs/${faq.id}`, {
        headers: {
          authorization: localStorage.getItem("faq_token"),
        },
      })
      .then(() => {
        setShowDeleteModal(false);
        setDeleteAlert({
          variant: "success",
          fn: () => window.location.reload(),
          text: "Successfully deleted.",
        });
      })
      .catch(() => {
        setShowDeleteModal(false);
        setDeleteAlert({
          variant: "danger",
          fn: () => setDeleteAlert(null),
          text: "Oops, something went wrong.",
        });
      });
  }

  function deleteModal() {
    return (
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Once you delete an FAQ, it can't be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteFAQ}>
            Yes, delete.
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function editAndDeleteBtns() {
    return (
      <Row>
        <Col>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            type="button"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </Col>
      </Row>
    );
  }

  function showAnswer() {
    if (isAdmin) {
      return (
        <>
          <Row>
            <Col>
              <p>{faq.answer}</p>
            </Col>
          </Row>
          {editAndDeleteBtns()}
        </>
      );
    } else {
      return (
        <Collapse in={open}>
          <div>{faq.answer}</div>
        </Collapse>
      );
    }
  }

  return (
    <>
      {deleteModal()}
      <Card className="faq-card">
        {deleteAlert && (
          <CustomAlert
            variant={deleteAlert.variant}
            fn={deleteAlert.fn}
            text={deleteAlert.text}
          />
        )}
        {editAlert && (
          <CustomAlert
            variant={editAlert.variant}
            fn={editAlert.fn}
            text={editAlert.text}
          />
        )}
        {editing ? (
          <FaqForm
            faq={faq}
            editing={editing}
            setEditing={setEditing}
            setEditAlert={setEditAlert}
          />
        ) : (
          <>
            <Row id="faq-top-row" onClick={() => setOpen(!open)}>
              <Col xs={10} id="faq-question-col">
                <h3>{faq.question}</h3>
              </Col>
              <div id="faq-collapse-col">
                {!isAdmin && (
                  <div id="faq-collapse-btn">{open ? "-" : "+"}</div>
                )}
              </div>
            </Row>
            {showAnswer()}
          </>
        )}
      </Card>
    </>
  );
};
