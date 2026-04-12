const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.createRatingValidator = [
  body("member_id")
    .notEmpty().withMessage("member_id is required")
    .isInt().withMessage("member_id must be a number"),

  body("trainer_id")
    .notEmpty().withMessage("trainer_id is required")
    .isInt().withMessage("trainer_id must be a number"),

  body("rating")
    .notEmpty().withMessage("rating is required")
    .isInt({ min: 1, max: 5 }).withMessage("rating must be between 1 and 5"),

  body("feedback")
    .optional()
    .isString().withMessage("feedback must be text"),

  validateRequest
];

