const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.createWorkoutValidator = [
    body("title").trim().notEmpty().withMessage("Title is required"),

    body("description").optional().isString().withMessage("Description must be text"),

    body("trainer_id").notEmpty().withMessage("trainer_id is required").isInt().withMessage("trainer_id must be a number"),

    validateRequest,
];