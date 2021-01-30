const mongoose = require("mongoose");
const User = require("./models/userModel");
const Order = require("./models/orderModel");
const Product = require("./models/productModel");
const products = require("./products.js");
const users = require("./data/users");
const connection = require("./config/connection");

connection();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    await User.insertMany(users);

    const adminUser = await User.findOne({ isAdmin: true });
    console.log(adminUser._id);
    const upProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser._id,
      };
    });
    await Product.insertMany(upProducts);
    console.log("Data Imported");
  } catch (error) {
    console.error(error.msg);
    process.exit(1);
  }
};

const del = async () => {
  await User.deleteMany();
  await Order.deleteMany();
  await Products.deleteMany();
  console.log("Data deleted!");
};

if (process.argv[2] == "-d") {
  del();
} else {
  importData();
}
