function requirePermissions(requiredPermissions = []) {
    return (req, res, next) => {
        const userPermissions = req.user?.permissions || [];

        const hasPermission = requiredPermissions.every(
            (p) => userPermissions.includes(p) || userPermissions.includes("admin:*")
        );

        if (!hasPermission) {
            return res.status(403).json({ error: "Forbidden" });
        }

        next();
    };
}

module.exports = { requirePermissions };