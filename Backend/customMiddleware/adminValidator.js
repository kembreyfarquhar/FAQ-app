module.exports = {
  adminValidator,
};

function adminValidator(admin) {
  const { email, password } = admin;
  let errors = [];

  //=================CHECK THAT REQUIRED FIELDS EXIST=================//
  if (!email || !password) {
    if (!email) {
      errors.push("must provide an email");
    }
    if (!password) {
      errors.push("must provide a password");
    }
  } else {
    //============================CHECK TYPES============================//
    if (typeof email !== "string") {
      errors.push("email must be a string");
    }

    if (typeof password !== "string") {
      errors.push("password must be a string");
    }

    //=======================CHECK CHARACTERS & LENGTH=======================//
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("please provide a valid email address");
    }

    if (password.includes(" ") || password.length < 8) {
      errors.push(
        "password may not contain spaces and must be at least 8 characters long"
      );
    }

    if (password.length > 255) {
      errors.push("password must be under 256 characters");
    }
  }

  //RETURN OBJECT WITH isSuccessful PROPERTY, TRUE IF NO ERRORS OCCUR, FALSE IF THEY DO
  return { isSuccessful: errors.length ? false : true, errors: errors };
}
