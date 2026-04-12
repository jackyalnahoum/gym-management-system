const { verifyToken } = require("../utils/token");

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}

module.exports = { authenticate };