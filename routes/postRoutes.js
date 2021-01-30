const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth");
const PostsController = require("../Controllers/PostsController");
router
  .route("/")
  .get(PostsController.getAllPosts)
  .post(authUser, PostsController.createPost);
router.route("/like/:postId").get(authUser, PostsController.likePost);
router.route("/retweet/:postId").get(authUser, PostsController.retweetPost);
router.route("/profile/:id").get(PostsController.userProfilePosts);
router.route("/reply/:postId").post(authUser, PostsController.replyPost);
router.route("/delete/:postId").delete(authUser, PostsController.deletePost);

module.exports = router;
