const { Permissions } = require("./permissions");

const ROLE_DEFINITIONS = Object.freeze({
    admin: [Permissions.ADMIN],
    manager: [
        Permissions.MEMBER_READ,
        Permissions.MEMBER_WRITE,
        Permissions.TRAINER_READ,
        Permissions.WORKOUT_PLAN_READ
    ],
    viewer: [
        Permissions.MEMBER_READ,
        Permissions.TRAINER_READ,
        Permissions.WORKOUT_PLAN_READ
    ],
});

function resolvePermissionsForRoles(roles) {
    const permissions = new Set();

    for (const role of roles) {
        const perms = ROLE_DEFINITIONS[role] || [];
        perms.forEach(p => permissions.add(p));
    }

    
    if (permissions.has(Permissions.ADMIN)) {
        return Object.values(Permissions);
    }

    return Array.from(permissions);
}

module.exports = {
    ROLE_DEFINITIONS,
    resolvePermissionsForRoles,
};