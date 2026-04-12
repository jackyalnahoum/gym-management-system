const express = require("express");
const TrainerRatingController = require("../controllers/trainerRating.controller");
const { createRatingValidator } = require("../validators/trainerRating.validator");
const { authenticate } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/authorize.middleware");
const { Permissions } = require("../auth/permissions");

const router = express.Router();

router.use(authenticate);

router.get("/",
  requirePermissions([Permissions.TRAINER_READ]),
  TrainerRatingController.getAllRatings
);

router.post("/",
  createRatingValidator,
  requirePermissions([Permissions.TRAINER_WRITE]),
  TrainerRatingController.createRating
);

router.delete("/:rating_id",
  requirePermissions([Permissions.TRAINER_WRITE]),
  TrainerRatingController.deleteRating
);

module.exports = router;