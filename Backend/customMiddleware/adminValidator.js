require("dotenv").config();
const bcrypt = require("bcryptjs");
const Admins = require("../api/controllers/adminsController");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

module.exports = {
  adminValidator,
  validateWithPassword,
  tokenRestricted,
};

function tokenRestricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please provide a token" });
  }
}

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
    if (typeof email !== "string" || typeof password !== "string") {
      if (typeof email !== "string") {
        errors.push("email must be a string");
      }
      if (typeof password !== "string") {
        errors.push("password must be a string");
      }
    } else {
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
  }
  //RETURN OBJECT WITH isSuccessful PROPERTY, TRUE IF NO ERRORS OCCUR, FALSE IF THEY DO
  return { isSuccessful: errors.length ? false : true, errors: errors };
}

async function validateWithPassword(req, res, next) {
  const { email, password } = req.body;

  if (!password || !email) {
    res.status(400).json({ error: "Please provide a password and email" });
  }

  try {
    const admin = await Admins.findByEmail(email);

    if (admin && bcrypt.compareSync(password, admin.password)) {
      req.admin = admin;
      next();
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err.toString(), message: "something went wrong" });
  }
}
