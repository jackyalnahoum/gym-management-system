# Gym Membership System – Auth, Middleware & Error Handling Guide

This project uses three core backend patterns to ensure secure and consistent API behavior:

1. Authentication middleware using JWT  
2. Request validation middleware using express-validator  
3. A shared `handleError` utility for consistent error responses  

---

## Files Involved

- `src/utils/errorHandler.js`
- `src/middleware/auth.middleware.js`
- `src/routes/auth.routes.js`
- `src/services/auth.service.js`
- `src/utils/token.js`
- `src/validators/member.validator.js`
- `src/validators/trainer.validator.js`
- `src/validators/workout.validator.js`
- `src/validators/subscription.validator.js`
- `src/validators/progress.validator.js`
- `src/validators/rating.validator.js`
- `src/routes/member.routes.js`
- `src/routes/trainer.routes.js`
- `src/routes/workout.routes.js`
- `src/routes/subscription.routes.js`
- `src/routes/progress.routes.js`
- `src/routes/rating.routes.js`
- `src/app.js`

---

## How the Middleware Works

The app first enables JSON request parsing in `src/app.js`:

```js
app.use(express.json());

This middleware parses incoming JSON requests and makes the data available in req.body.

Authentication Flow

Authentication starts with:

app.use("/api/v1/auth", authRoutes);
Login Request

POST /api/v1/auth/login expects:

{
  "username": "admin",
  "password": "password123"
}

If credentials are valid, the server returns:

{
  "token": "..."
}
Protected Routes

All protected routes require:

Authorization: Bearer <token>

The authentication middleware:

verifies JWT
attaches decoded payload to req.user
blocks invalid requests with 401 Unauthorized
Environment Variables For Auth
AUTH_USERNAME
AUTH_PASSWORD
AUTH_SECRET
AUTH_TOKEN_TTL_SECONDS

Default development values:

username: admin
password: password123
secret: dev-secret-change-me
token expiry: 3600 seconds
Validation Middleware

Some routes use validation before controllers run.

Example (member.routes.js):

router.post("/", createValidator, MemberController.create);
router.put("/:member_id", createValidator, MemberController.update);
Example validation rules (member.validator.js)
exports.createValidator = [
    body("email").isEmail().normalizeEmail(),
    body("full_name").trim().notEmpty().withMessage("Name is required"),
    validateRequest,
];
What each step does
body("email").isEmail() → checks email format
normalizeEmail() → cleans email
body("full_name").trim().notEmpty() → ensures name is not empty
validateRequest → collects validation errors

If validation fails:

return res.status(400).json({ errors: errors.array() });

If validation passes:

next();
handleError Utility

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
Error Mapping
"not found" → 404 Not Found
"required" → 400 Bad Request
anything else → 500 Internal Server Error
Request Flow

For a request like:

POST /api/v1/members

The flow is:

express.json() parses request body
Authentication middleware checks token
Validation middleware checks input
Controller receives request
Service executes business logic
Repository interacts with database
Response is returned
Errors are handled by handleError
Example Behavior
Missing fields
{
  "email": "test@example.com"
}

Response:

400 Bad Request
Missing token

Response:

401 Unauthorized
Not found error
throw new Error("Member not found");

Response:

404 Not Found
Complex Workflow Example
Login to get token
Create trainer
Create workout plan
Create member
Subscribe member
Add progress
Add rating
Test validation errors
Architecture Overview

This project follows a layered architecture:

Controllers → handle requests
Services → business logic
Repositories → database access
Validators → input validation
Middleware → authentication + authorization
Utils → shared helpers (handleError, token)
Summary

This backend system ensures:

Secure JWT authentication
Clean role-ready structure
Validation before controllers
Centralized error handling
Clean separation of layers

---
