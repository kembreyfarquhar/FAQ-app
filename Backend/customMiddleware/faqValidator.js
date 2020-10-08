const FAQS = require("../api/controllers/faqsController");

module.exports = {
  validateFaqId,
  faqValidator,
};

async function validateFaqId(req, res, next) {
  const id = req.params.id;

  try {
    const faq = await FAQS.findById(id);

    if (faq) {
      req.faq = faq;
      next();
    } else {
      res.status(400).json({ error: "faq not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err.toString(), message: "something went wrong" });
  }
}

function faqValidator(faq) {
  const { question, answer } = faq;
  let errors = [];

  //=================CHECK THAT REQUIRED FIELDS EXIST=================//
  if (!question || !answer) {
    if (!question) {
      errors.push("must provide a question");
    }
    if (!answer) {
      errors.push("must provide an answer");
    }
  } else {
    //============================CHECK TYPES============================//
    if (typeof question !== "string" || typeof answer !== "string") {
      if (typeof question !== "string") {
        errors.push("question must be a string");
      }
      if (typeof answer !== "string") {
        errors.push("answer must be a string");
      }
    } else {
      //=======================CHECK CHARACTERS & LENGTH=======================//
      if (question.length < 10 || question.length > 255) {
        errors.push("question must be between 10 and 255 characters");
      }

      if (answer.length < 10 || answer.length > 1000) {
        errors.push("answer must be between 10 and 1000 characters");
      }
    }
  }
  //RETURN OBJECT WITH isSuccessful PROPERTY, TRUE IF NO ERRORS OCCUR, FALSE IF THEY DO
  return { isSuccessful: errors.length ? false : true, errors: errors };
}
