const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.createSubscriptionValidator = [
    body("member_id")
        .notEmpty()
        .withMessage("member_id is required")
        .isInt()
        .withMessage("member_id must be a number"),

    body("workout_id")
        .notEmpty()
        .withMessage("workout_id is required")
        .isInt()
        .withMessage("workout_id must be a number"),

    body("start_date")
        .notEmpty()
        .withMessage("start_date is required")
        .isISO8601()
        .withMessage("Invalid date format"),

    body("end_date")
        .optional()
        .isISO8601()
        .withMessage("Invalid date format"),

    body("status")
        .optional()
        .isString()
        .withMessage("Status must be text"),

    validateRequest,
];