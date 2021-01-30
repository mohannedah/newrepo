const express = require("express");
const router = express.Router();
const Product = require("../server/models/productModel");
const User = require("../server/models/userModel");
const authUser = require("../server/middlewares/auth");
const admin = require("../server/middlewares/admin");
const userController = require("../server/Controllers/userController");
router.route("/login").post(userController.auth);
router.route("/register").post(userController.registerUser);
router
  .route("/profile")
  .get(authUser, userController.getUserProfile)
  .put(authUser, userController.updateUser);
router.route("/").get(authUser, admin, userController.getAllUsers);
router.route("/:id").delete(authUser, admin, userController.deleteUser);
router
  .route("/edit/:id")
  .put(authUser, admin, userController.updateUserFromAdmin);

module.exports = router;
