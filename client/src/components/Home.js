import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/esm/Card";
import Spinner from "react-bootstrap/Spinner";
import { Faq } from "./Faq";
import { FaqForm } from "./FaqForm";
import { CustomAlert } from "./CustomAlert";
import { Header } from "./Header";
import { SendQuestion } from "./SendQuestion";

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
        {faqs.length > 0 ? (
          faqs.map((faq) => <Faq key={faq.id} faq={faq} isAdmin={isAdmin} />)
        ) : (
          <div id="faqs-spinner-container">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
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
        {!isAdmin && <SendQuestion />}
      </Container>
    </>
  );
};
