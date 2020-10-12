import React from "react";
import Alert from "react-bootstrap/Alert";

export const CustomAlert = ({ variant, fn, text }) => {
  if (variant === "danger") {
    return (
      <Alert variant={variant} onClose={fn} dismissible>
        {text}
      </Alert>
    );
  }
  if (variant === "success") {
    return <Alert variant={variant}>{text}</Alert>;
  }
};

export const successReload = () => {
  window.setTimeout(() => {
    window.location.reload();
  }, 2000);
};
