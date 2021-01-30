const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { body, validationResult } = require("express-validator");

exports.registerUser =
  ([
    body("name").not().isEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password, passwordConfirm } = req.body;
      const existUser = await User.findOne({ email });

      if (existUser) {
        return res.status(400).json({ msg: "User already exists!" });
      }

      if (email === "" || name === "" || password === "") {
        return res.status(400).json({ msg: "Please fill in all fields!" });
      }

      if (password !== passwordConfirm || passwordConfirm === "") {
        return res
          .status(400)
          .json({ msg: "Please consider confirming your password " });
      }

      let user;
      user = await User.create({
        email,
        name,
        password,
        passwordConfirm,
      });

      res.status(200).json({
        email: user.email,
        name: user.name,
        id: user._id,
        profileImage: user.profileImage,
        coverImage: user.coverPhoto,
        token: await generateToken(user._id),
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Internal Server Error!" });
    }
  });

exports.auth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (email === "" || password === "") {
      return res.status(400).json({ msg: "Please fill in all fields!" });
    }

    if (!user) {
      return res.status(404).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(404).json({ msg: "Invalid Credentials" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id,
      token: await generateToken(user._id),
      profileImage: user.profileImage,
      coverImage: user.coverPhoto,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
  next();
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await (await User.findById(id).select("-password")).populate(
      "posts"
    );
    if (!user) {
      return res.status(404).json({ msg: "No User found with this id" });
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id,
      posts: user.posts,
      token: await generateToken(user._id),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
  next();
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User with this id is not found" });
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }
    }

    const updatedUser = await user.save();

    res.status(200).json({
      email: updatedUser.email,
      id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      token: await generateToken(updatedUser._id),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.updateUserFromAdmin = async (req, res, next) => {
  try {
    const { name, email, isAdmin } = req.body;
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User with this id is not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json({
      email: updatedUser.email,
      id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ msg: "No users registered" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Serever Error!" });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.status(200).json({ msg: "Successfully Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.userProfilePosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userPosts = await User.find({ replyTo: { $exists: false } });
    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

exports.updateUserProfilePhoto = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { profileImage } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { profileImage: profileImage },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ msg: "No user found with this id" });
    }

    res.status(200).json({ user, msg: "Profile Image updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

exports.updateUserCoverPhoto = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { coverImage } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { coverImage: coverImage },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ msg: "No user found with this id" });
    }

    res.status(200).json({ user, msg: "Profile Image updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};
