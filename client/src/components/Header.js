import React from "react";
import logo from "../assets/CircleLogo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export const Header = (props) => {
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
