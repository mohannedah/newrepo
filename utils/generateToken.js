const jwt = require("jsonwebtoken");
const config = require("config");
const dotenv = require("dotenv");

const generateToken = async (id) => {
  const payload = {
    user: {
      id,
    },
  };
  return await jwt.sign({ payload }, process.env.JWTSECRET, {
    expiresIn: "36000000",
  });
};

module.exports = generateToken;
