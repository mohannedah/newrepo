const mongoose = require("mongoose");
const config = require("config");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();
const db = process.env.MONGOURI;

const connection = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Connection Successful!".yellow);
  } catch (err) {
    console.error(err.message).red.bold;
    process.exit(1);
  }
};

module.exports = connection;
