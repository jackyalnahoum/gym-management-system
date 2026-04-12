const express = require("express");
const SubscriptionController = require("../controllers/subscription.controller");
const { createSubscriptionValidator } = require("../validators/subscription.validator");
const { authenticate } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/authorize.middleware");
const { Permissions } = require("../auth/permissions");


const router = express.Router();

router.use(authenticate);

router.get("/",
  requirePermissions([Permissions.MEMBER__READ]),
  SubscriptionController.getAllSubscriptions
);

router.post("/",
  createSubscriptionValidator,
  requirePermissions([Permissions.MEMBER_WRITE]),
  SubscriptionController.createSubscription
);

router.delete("/:id",
  requirePermissions([Permissions.MEMBER_WRITE]),
  SubscriptionController.deleteSubscription
);

module.exports = router;