const express = require("express");
const MemberController = require("../controllers/member.controller");
const { createValidator } = require("../validators/member.validator");
const { authenticate } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/authorize.middleware");
const { Permissions } = require("../auth/permissions");

const router = express.Router();

router.use(authenticate);

router.get("/", 
  requirePermissions([Permissions.MEMBER_READ]),
  MemberController.getAllMembers
);

router.get("/:member_id",
  requirePermissions([Permissions.MEMBER_READ]),
  MemberController.getMemberById
);

router.post("/",
  createValidator,
  requirePermissions([Permissions.MEMBER_WRITE]),
  MemberController.createMember
);

router.put("/:member_id",
  requirePermissions([Permissions.MEMBER_WRITE]),
  MemberController.updateMember
);

router.delete("/:member_id",
  requirePermissions([Permissions.MEMBER_WRITE]),
  MemberController.deleteMember
);

module.exports = router;