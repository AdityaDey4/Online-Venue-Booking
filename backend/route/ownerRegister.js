const express = require("express");
const router = express.Router();

const ownerRegisterController = require("../controller/ownerRegisterController");

router.post("/", ownerRegisterController.handleNewVenueOwner);

module.exports = router;