const User = require("../models/userModel");
const admin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user && user.isAdmin) {
    next();
  } else {
    console.log(req.user);
    return res.status(401).json({ msg: "Not authorized as an admin" });
  }
};

module.exports = admin;
