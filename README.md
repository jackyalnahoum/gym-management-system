# Gym Management System

Gym Management System – Error Handling and Middleware Guide

This project uses a structured approach to handle requests, authentication, validation, and errors in a consistent way.

The main patterns used are:

Request validation middleware
Authentication middleware (JWT)
Authorization (roles and permissions)
A shared handleError helper
Files Involved
src/utils/errorHandler.js
src/utils/token.js
src/middleware/auth.middleware.js
src/middleware/authorize.middleware.js
src/auth/permissions.js
src/auth/roleManager.js
src/routes/*.js
src/services/*.js
src/validators/*.js
src/app.js
How the Middleware Works

The application first enables JSON parsing in app.js:

app.use(express.json());

This allows incoming JSON requests to be accessed using:

req.body
Authentication Flow

Authentication starts with the login route:

app.use("/auth", authRoutes);
Login Request
{
  "email": "test@test.com",
  "password": "1234"
}

If credentials are valid, the server returns:

{
  "token": "..."
}
Protected Routes

Protected routes use:

router.use(authenticate);

The middleware checks:

Authorization: Bearer <token>
Behavior
Missing token → 401 Authentication required
Invalid token → 401
Valid token → payload stored in req.user
Validation Middleware

Validation is implemented using express-validator.

Example:

exports.createValidator = [
    body("email").isEmail().normalizeEmail(),
    body("full_name").notEmpty().withMessage("Name is required"),
    validateRequest,
];
How it works
Validates request fields
Stops execution if invalid
Returns:
{
  "errors": [...]
}

If valid:

next();
Authorization Middleware

Authorization is handled using:

requireRoles()
requirePermissions()

Example:

router.post(
    "/",
    authenticate,
    requirePermissions("member:write"),
    Controller.create
);

If user lacks permission:

{
  "error": "Forbidden"
}
How handleError Works

Located in:

src/utils/errorHandler.js
function handleError(res, err) {
    if (err.message?.toLowerCase().includes("not found")) {
        return res.status(404).json({ error: err.message });
    }
    if (err.message?.includes("required")) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
}
Mapping
"not found" → 404
"required" → 400
others → 500
Request Flow

Example: POST /member

express.json() parses body
authenticate verifies token
validator checks input
controller runs
service executes logic
repository interacts with DB
errors passed to handleError
Example
Missing token
{
  "error": "Authentication required"
}
Validation error
{
  "errors": [...]
}
Not found
{
  "error": "Member not found"
}
Summary

This project demonstrates:

Layered architecture (controller → service → repository)
JWT authentication
Role & permission-based authorization
Validation middleware
Centralized error handling