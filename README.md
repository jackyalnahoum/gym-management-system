# Error Handling and Middleware Guide

This project uses three simple patterns to protect routes and return consistent API errors:

1. Request validation middleware  
2. Authentication middleware  
3. A shared `handleError` helper  

---

## Files Involved

- `src/utils/errorHandler.js`
- `src/middleware/auth.middleware.js`
- `src/routes/auth.routes.js`
- `src/services/auth.service.js`
- `src/validators/trainer.validator.js`
- `src/validators/member.validator.js`
- `src/validators/progress.validator.js`
- `src/validators/trainer_rating.validator.js`
- `src/validators/subscription.validator.js`
- `src/validators/workout_plan.validator.js`
- `src/routes/member.routes.js`
- `src/routes/trainer.routes.js`
- `src/routes/progress.routes.js`
- `src/routes/subscription.routes.js`
- `src/routes/trainer_rating.routes.js`
- `src/routes/workout_plan.routes.js`
- `src/app.js`

---

## How the Middleware Works

The app first enables JSON request parsing in `src/app.js`:

```js
app.use(express.json());

uthentication Flow

Authentication starts with the public login route:

app.use("/api/v1/auth", authRoutes);

POST /api/v1/auth/login expects:

{
  "username": "admin",
  "password": "password123"
}

If the credentials match the configured environment variables, the app returns a token:

{
  "token": "..."
}

The protected route groups use authentication middleware before any controller runs:

router.use(authenticate);

The middleware checks the Authorization header:

Authorization: Bearer <token>

If the token is missing or invalid, the middleware returns:

401 Unauthorized

If valid, it stores the decoded payload on req.user and calls next().

Environment Variables For Auth
AUTH_USERNAME
AUTH_PASSWORD
AUTH_SECRET
AUTH_TOKEN_TTL_SECONDS

If these are not set, defaults are:

username: admin
password: password123
secret: dev-secret-change-me
token lifetime: 3600 seconds
Validation Middleware

Some routes use validation before controllers run.

Example in client.routes.js:

router.post("/", createValidator, ClientController.create);
router.put("/:id", createValidator, ClientController.update);

Validation rules are defined in client.validator.js:

exports.createValidator = [
    body("email").isEmail().normalizeEmail(),
    body("name").trim().notEmpty().withMessage("Name is required"),
    validateRequest,
];
What each step does
body("email").isEmail() → checks valid email format
normalizeEmail() → cleans email format
body("name").trim().notEmpty() → ensures name is not empty
validateRequest → collects validation errors

If validation fails:

return res.status(400).json({ errors: errors.array() });

If validation passes:

next();
handleError Utility

Located in src/utils/errorHandler.js:

function handleError(res, err) {
    if (err.message?.toLowerCase().includes("not found")) {
        return res.status(404).json({ error: err.message });
    }

    if (err.message?.includes("required")) {
        return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: err.message });
}

It maps errors to HTTP responses:

"not found" → 404
"required" → 400
everything else → 500
Request Flow

For a request like:

POST /api/v1/clients

The flow is:

express.json() parses request body
Authentication middleware validates token
Validation middleware checks input
Controller receives request
Service layer executes logic
Repository accesses database
Response is returned
handleError handles errors
Example

If request body is invalid:

{
  "email": "test@example.com"
}

Response:

400 Bad Request

If token is missing:

401 Unauthorized

If data is not found:

throw new Error("Client not found");

Response:

404 Not Found
Complex Example: Full Workflow
Login and get token
Create department
Create client
Test validation error
Filter clients
Read client with department join
View department reports
Summary

This project uses a layered architecture:

Middleware runs before controllers
Authentication protects routes
Validation ensures correct input
Services handle business logic
Repositories interact with database
handleError standardizes errors