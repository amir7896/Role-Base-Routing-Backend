const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authorization");
const userController = require("../controllers/test");

// Route for admin access (get all users)
router.get("/users", authMiddleware(["Admin"]), userController.getUsers);

// Route for user access
router.get("/user-access", authMiddleware(["User"]), userController.userAccess);

// Route for manager access
router.get(
  "/manager-access",
  authMiddleware(["Manager"]),
  userController.managerAccess
);

// Route for service provider access
router.get(
  "/service-provider-access",
  authMiddleware(["Service Provider"]),
  userController.serviceProviderAccess
);

// Route for admin and manager access
router.get(
  "/admin-and-manager-access",
  authMiddleware(["Admin", "Manager"]),
  userController.adminAndManagerAccess
);

module.exports = router;
