const express = require("express");
const router = express.Router();
const detailController = require("../controller/api/detailController");

router.route("/:id")
    .get(detailController.getUserBookingDetails);

module.exports = router;