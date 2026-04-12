const express = require("express");
const TrainerController = require("../controllers/trainer.controller");
const { createTrainerValidator } = require("../validators/trainer.validator");
const { authenticate } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/authorize.middleware");
const { Permissions } = require("../auth/permissions");

const router = express.Router();

router.use(authenticate);

router.get("/",
  requirePermissions([Permissions.TRAINER_READ]),
  TrainerController.getAllTrainers
);

router.get("/:trainer_id",
  requirePermissions([Permissions.TRAINER_READ]),
  TrainerController.getTrainerById
);

router.post("/",
  createTrainerValidator,
  requirePermissions([Permissions.TRAINER_WRITE]),
  TrainerController.createTrainer
);

router.put("/:trainer_id",
  requirePermissions([Permissions.TRAINER_WRITE]),
  TrainerController.updateTrainer
);

router.delete("/:trainer_id",
  requirePermissions([Permissions.TRAINER_WRITE]),
  TrainerController.deleteTrainer
);

module.exports = router;