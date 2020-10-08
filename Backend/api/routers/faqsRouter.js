const router = require("express").Router();
const FAQS = require("../controllers/faqsController");
const validator = require("../../customMiddleware/faqValidator");
const restricted = require("../../customMiddleware/adminValidator");

//GET ALL FAQS
router.get("/", (req, res) => {
  FAQS.find()
    .then((faqs) => {
      res.status(200).json(faqs);
    })
    .catch((err) =>
      res.status(500).json({ error: err.toString(), detail: err.detail })
    );
});

//GET ONE FAQ
router.get("/:id", validator.validateFaqId, (req, res) => {
  res.status(202).json(req.faq);
});

//POST FAQ
router.post("/", restricted.tokenRestricted, (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Please provide a question and answer." });
  }

  const userId = req.jwtToken.subject;
  const faq = { ...req.body, created_by: userId, last_edited_by: userId };
  const status = validator.faqValidator(faq);

  if (!status.isSuccessful) {
    res.status(400).json(status);
  } else {
    FAQS.add(faq).then((saved) => {
      res.status(201).json(saved);
    });
  }
});

module.exports = router;
