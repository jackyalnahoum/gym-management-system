const Permissions = Object.freeze({
    MEMBER_READ: "member:read",
    MEMBER_WRITE: "member:write",
    TRAINER_READ: "trainer:read",
    TRAINER_WRITE: "trainer:write",
    WORKOUT_PLAN_READ: "workout_plan:read",
    WORKOUT_PLAN_WRITE: "workout_plan:write",
    ADMIN: "admin:*",
});

module.exports = { Permissions };