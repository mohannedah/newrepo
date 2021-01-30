const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postedAt: {
      type: Date,
    },
    content: {
      type: String,
      trim: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    retweetData: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
    retweetUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
  },
  {
    timestamps: true,
  }
);
const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
