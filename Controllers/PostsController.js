const Posts = require("../models/PostsModel");
const User = require("../models/userModel");

exports.createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { id } = req.user;
    const user = await User.findById(id);
    const newPost = await Posts.create({
      content: content,
      user: user._id,
    });

    user.userPosts.push(newPost);
    await user.save();
    res.status(200).json({
      content: newPost.content,
      user: newPost.user,
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find()
      .populate("user")
      .populate({
        path: "retweetData",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "replyTo",
        populate: {
          path: "user",
        },
      });

    if (!posts) {
      return res.status(404).json({ msg: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    let user = await User.findById(id);
    let post = await Posts.findById(postId);
    const isLiked = post.likes.includes(user._id);
    if (isLiked) {
      post = await Posts.findByIdAndUpdate(
        postId,
        { ["$pull"]: { likes: user._id } },
        { new: true }
      );
      user = await User.findByIdAndUpdate(
        id,
        { ["$pull"]: { likes: postId } },
        { new: true }
      );
      return res.status(200).json({ msg: "Unliked Successfully!" });
    } else {
      post = await Posts.findByIdAndUpdate(
        postId,
        { ["$addToSet"]: { likes: user._id } },
        { new: true }
      );
      user = await User.findByIdAndUpdate(
        id,
        { ["$addToSet"]: { likes: postId } },
        { new: true }
      );
      return res.status(200).json({ msg: "Liked Successfully!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.retweetPost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    let user = await User.findById(id);
    let post = await Posts.findOneAndDelete({
      user: user._id,
      retweetData: postId,
    });

    if (post === null) {
      post = await Posts.create({
        retweetData: postId,
        user: user._id,
      });
      post = await Posts.findByIdAndUpdate(
        postId,
        {
          ["$addToSet"]: { retweetUsers: user._id },
        },
        { new: true }
      );
      user = await User.findByIdAndUpdate(
        user._id,
        {
          ["$addToSet"]: { retweets: postId },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ post, user, msg: "Retweeted Successfully!" });
    } else {
      post = await Posts.findByIdAndUpdate(
        postId,
        {
          ["$pull"]: { retweetUsers: user._id },
        },
        { new: true }
      );
      user = await User.findByIdAndUpdate(
        user._id,
        {
          ["$pull"]: { retweets: postId },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ msg: "You succesfully have deleted the retweet!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id } = req.user;

    const post = await Posts.findOneAndDelete({ _id: postId, user: id });
    if (post === null) {
      return res.status(404).json({ msg: "No post found with this ID" });
    } else {
      return res.status(200).json({ msg: "Deleted Successfully" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.replyPost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    const newPost = await Posts.create({
      content: req.body.content,
      replyTo: postId,
      user: id,
    });
    res.status(200).json({ newPost, msg: "Successfully replied!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// exports.profilePosts = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const posts = await Posts.find({ user: id });
//     if (!posts) {
//       return res.status(400).json({ msg: "User has not posted yet" });
//     }
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

exports.userProfilePosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userPosts = await Posts.find({
      user: id,
      replyTo: { $exists: false },
    })
      .populate("user")
      .populate({
        path: "retweetData",
        populate: {
          path: "user",
        },
      });
    const user = await User.findById(id);
    const userReplyPosts = await Posts.find({
      user: id,
      replyTo: { $exists: true },
    })
      .populate("user")
      .populate({
        path: "retweetData",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "replyTo",
        populate: {
          path: "user",
        },
      });
    res.status(200).json({ userPosts, userReplyPosts, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};
