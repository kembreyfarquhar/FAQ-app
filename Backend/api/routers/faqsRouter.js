const router = require("express").Router();
const FAQS = require("../controllers/faqsController");

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

module.exports = router;
