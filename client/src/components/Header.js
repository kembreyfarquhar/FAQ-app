import React, { useState } from "react";
import logo from "../assets/CircleLogo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { ChangePassword } from "./ChangePassword";

export const Header = (props) => {
  const { setIsLoggingIn, isAdmin, setIsAdmin } = props;
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  return (
    <div id="home-container">
      {changePasswordModal && (
        <ChangePassword
          changePasswordModal={changePasswordModal}
          setChangePasswordModal={setChangePasswordModal}
        />
      )}
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
          {props.isAdmin && (
            <p
              id="change-password-btn"
              onClick={() => setChangePasswordModal(true)}
            >
              Change Password
            </p>
          )}
        </Col>
      </Row>
      <Row id="faq-heading-row">
        <h1 id="faq-heading">Frequently Asked Questions</h1>
      </Row>
    </div>
  );
};
