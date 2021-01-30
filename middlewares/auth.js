const jwt = require("jsonwebtoken");
const config = require("config");
const dotenv = require("dotenv");
const secret = config.get("jwtSecret");

dotenv.config();

const authUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.payload.user;
  }

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized" });
  }

  next();
};

module.exports = authUser;
