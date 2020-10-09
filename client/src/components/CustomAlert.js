import React from "react";
import Alert from "react-bootstrap/Alert";

export const CustomAlert = ({ variant, fn, text }) => {
  return (
    <Alert variant={variant} onClose={fn} dismissible>
      {text}
    </Alert>
  );
};
