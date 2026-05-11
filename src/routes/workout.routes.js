const express = require("express");
const WorkoutController = require("../controllers/workout.controller");
const { createWorkoutValidator } = require("../validators/workout.validator");
const { authenticate } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/authorize.middleware");
const { Permissions } = require("../auth/permissions");


const router = express.Router();

router.use(authenticate);

router.get("/",
  requirePermissions([Permissions.WORKOUT_PLAN_READ]),
  WorkoutController.getAllWorkouts
);

router.get("/:workout_id",
  requirePermissions([Permissions.WORKOUT_PLAN_READ]),
  WorkoutController.getWorkoutById
);

router.post("/",
  createWorkoutValidator,
  requirePermissions([Permissions.WORKOUT_PLAN_WRITE]),
  WorkoutController.createWorkout
);

router.put("/:workout_id",
  requirePermissions([Permissions.WORKOUT_PLAN_WRITE]),
  WorkoutController.updateWorkout
);

router.delete("/:workout_id",
  requirePermissions([Permissions.WORKOUT_PLAN_WRITE]),
  WorkoutController.deleteWorkout
);

module.exports = router;