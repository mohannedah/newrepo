const express = require("express");
const router = express.Router();
const Address = require("../server/models/addressModel");
const addressController = require("../server/Controllers/addressController");
const auth = require("../server/middlewares/auth");
router.route("/:id").get(auth, addressController.getAddress);
router.route("/").post(auth, addressController.placeAddress);
module.exports = router;
