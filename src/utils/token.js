const jwt = require("jsonwebtoken");

const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60;

function getSecret() {
    return process.env.AUTH_SECRET || "dev-secret";
}

function generateToken(payload) {
    return jwt.sign(payload, getSecret(), {
        expiresIn: DEFAULT_TOKEN_TTL_SECONDS,
    });
}

function verifyToken(token) {
    return jwt.verify(token, getSecret());
}

module.exports = { generateToken, verifyToken };