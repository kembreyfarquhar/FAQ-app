require("dotenv").config();

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

const Admins = require("../controllers/adminsController");
const adminValidator = require("../../customMiddleware/adminValidator");

//REGISTER NEW ADMIN
router.post("/register", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Please provide an email and password." });
  }

  const admin = req.body;
  const status = adminValidator.adminValidator(admin);

  if (!status.isSuccessful) {
    res.status(400).json(status);
  } else {
    const hash = bcrypt.hashSync(admin.password, 10);
    admin.password = hash;

    Admins.add(admin)
      .then((saved) => {
        delete saved.password;
        const token = genToken(saved);
        res.status(201).json({ admin: saved, token });
      })
      .catch((err) => {
        res.status(500).json({ error: err.toString(), detail: err.detail });
      });
  }
});

//ADMIN LOGIN
router.post("/login", adminValidator.validateWithPassword, (req, res) => {
  const admin = req.admin;
  delete admin.password;
  const token = genToken(admin);
  res.status(200).json({
    token,
    ...admin,
  });
});

//VALIDATE TOKEN
router.post("/:token", adminValidator.tokenRestricted, (req, res) => {
  res.status(200).json(req.token);
});

function genToken(admin) {
  const payload = {
    subject: admin.id,
    email: admin.email,
  };

  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
