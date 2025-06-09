const express = require("express");
const router = express.Router();
const detailController = require("../controller/api/detailController");
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require("../myMiddleware/verifyRoles");

router.route("/:email")
    .get(verifyRoles(ROLES_LIST.VenueOwner), detailController.getVenueOwnerBookingDetails);

module.exports = router;