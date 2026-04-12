const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createProgressValidator = [
    body("member_id")
        .notEmpty()
        .withMessage("member_id is required")
        .isInt()
        .withMessage("member_id must be a number"),

    body("weight")
        .optional()
        .isFloat()
        .withMessage("Weight must be a number"),

    body("notes")
        .optional()
        .isString()
        .withMessage("Notes must be text"),

    body("recorded_at")
        .optional()
        .isISO8601()
        .withMessage("Invalid date"),

    validateRequest,
];

module.exports = { createProgressValidator };