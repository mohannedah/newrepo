const express = require("express");
const router = express.Router();
const Product = require("../server/models/productModel");
const auth = require("../server/middlewares/auth");
const admin = require("../server/middlewares/admin");
const productController = require("../server/Controllers/productController");
router.route("/top-3-products").get(productController.topRatedProdcuts);
router
  .route("/")
  .get(productController.getAllProducts)
  .post(auth, admin, productController.createProduct);
router
  .route("/delete/:id")
  .delete(auth, admin, productController.deleteProduct);
router.route("/:id").get(productController.getProduct);
router.route("/:id/reviews").post(auth, productController.createReview);
router.route("/edit/:id").put(auth, admin, productController.updateProduct);
module.exports = router;
