require("dotenv").config();

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";
const nodemailer = require("nodemailer");

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
  res.status(200).json(req.jwtToken);
});

//CHANGE PASSWORD
router.patch("/password", adminValidator.tokenRestricted, (req, res) => {
  const email = req.jwtToken.email;
  if (
    !req.body.hasOwnProperty("password") ||
    Object.keys(req.body).length === 0
  )
    res.status(400).json({ error: "Please provide a password" });

  let password = req.body.password;
  const hash = bcrypt.hashSync(password, 10);
  password = hash;

  Admins.updatePassword(email, password)
    .then((saved) => {
      delete saved.password;
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({ error: err.toString(), detail: err.detail });
    });
});

//FORGOT PASSWORD
router.post(
  "/email/:email",
  adminValidator.validateAdminEmail,
  async (req, res) => {
    const email = req.params.email;
    let password = makePassword(10);

    const mailOptions = {
      from: process.env.YAHOO_USER,
      to: email,
      subject: "FAQ App Password Change",
      html: `<h3>You've requested a password change.</h3><br><p>Here is your temporary password: <strong>${password}</strong></p><br><p>Please visit the site <a href="https://faq-app.netlify.app/">here</a> and sign in with this password. Once you're done, please change it to something more personal and secure.</p><br><br><p>Thank you,</p><p>Curate FAQ App Team</p>`,
    };

    try {
      const hash = bcrypt.hashSync(password, 10);
      password = hash;
      const updatedUser = await Admins.updatePassword(email, password);
      wrappedSendMail(mailOptions)
        .then(() => {
          res.status(200).json({ message: "Password updated, email sent" });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res
        .status(500)
        .json({ error: err.toString(), message: "Something went wrong" });
    }
  }
);

async function wrappedSendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "stmp.mail.yahoo.com",
      port: 465,
      service: "yahoo",
      secure: false,
      auth: {
        user: process.env.YAHOO_USER,
        pass: process.env.YAHOO_PASS,
      },
      debug: false,
      logger: true,
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function makePassword(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
