JWT Role and Permission Guide

This project uses JWT authentication combined with role-based permission mapping.

Authentication Flow
User logs in using /auth/login
Server validates credentials
Server generates JWT
Token is returned
Protected routes verify token and permissions
JWT Payload

Example:

{
  "id": 1,
  "roles": ["admin"],
  "permissions": ["admin:*"],
  "iat": 123456,
  "exp": 123999
}
Token Generation

Tokens are generated using:

jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: 3600
});
Token Verification
jwt.verify(token, secret);

If invalid → error is thrown

Signing vs Encryption
JWT is signed, not encrypted
Payload is visible
Signature prevents modification
Password Handling

Passwords should be hashed using bcrypt.

Hashing is:

One-way
Secure
Cannot be reversed
Roles and Permissions
Permissions
member:read
member:write
trainer:read
trainer:write
admin:*
Roles
admin → full access
manager → limited access
viewer → read-only
Role Mapping

Defined in:

roleManager.js

Roles are converted into permissions.

Authentication Middleware

Checks:

Authorization: Bearer <token>

If valid:

attaches payload to req.user
Authorization Middleware

Functions:

requireRoles()
requirePermissions()
Example
requirePermissions("member:write")
Error Responses
Missing token
{
  "error": "Authentication required"
}
Forbidden
{
  "error": "Forbidden"
}
Summary
JWT handles authentication
Roles simplify user management
Permissions control access
Middleware enforces security