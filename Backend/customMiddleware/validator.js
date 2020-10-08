const bcrypt = require("bcryptjs");
const Admins = require("../api/controllers/adminsController");

module.exports = {
  validateWithPassword,
};

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
