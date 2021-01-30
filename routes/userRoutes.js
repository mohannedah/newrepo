const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const userController = require("../Controllers/userController");
router.route("/login").post(userController.auth);
router.route("/register").post(userController.registerUser);
router
  .route("/profile")
  .get(authUser, userController.getUserProfile)
  .put(authUser, userController.updateUser);
router.route("/").get(authUser, admin, userController.getAllUsers);
router.route("/:id").delete(authUser, admin, userController.deleteUser);
router
  .route("/updateProfileImage")
  .put(authUser, userController.updateUserProfilePhoto);
router
  .route("/updateCoverImage")
  .put(authUser, userController.updateUserCoverPhoto);
module.exports = router;
