const express = require("express");
const ProgressController = require("../controllers/progress.controller");
const { createProgressValidator } = require("../validators/progress.validator");
const { authenticate } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/authorize.middleware");
const { Permissions } = require("../auth/permissions");

const router = express.Router();
router.use(authenticate);

router.get("/",
  requirePermissions([Permissions.MEMBER_READ]),
  ProgressController.getAllProgress
);

router.post("/",
  createProgressValidator,
  requirePermissions([Permissions.MEMBER_WRITE]),
  ProgressController.createProgress
);

module.exports = router;