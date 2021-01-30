const express = require("express");
const router = express.Router();
const orderController = require("../server/Controllers/orderController");
const auth = require("../server/middlewares/auth");
const admin = require("../server/middlewares/admin");
router.route("/:id/deliver").get(auth, admin, orderController.deliverOrder);
router.route("/").post(auth, orderController.createProduct);
router.route("/order").get(auth, orderController.getAnOrder);
router.route("/:id").get(auth, orderController.getOrder);
router.route("/").get(auth, admin, orderController.getAllOrders);
router.route("/:id/pay").put(auth, orderController.payProduct);

module.exports = router;
