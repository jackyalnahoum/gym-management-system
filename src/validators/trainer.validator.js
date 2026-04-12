const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.createTrainerValidator = [
    body("full_name").trim().notEmpty().withMessage("Name is required"),
    body("specialization").trim().notEmpty().withMessage("Specialization is required"),

    validateRequest,
];