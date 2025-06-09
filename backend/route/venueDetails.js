const express = require("express");
const router = express.Router();
const detailController = require("../controller/api/detailController");
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require("../myMiddleware/verifyRoles");

router.route("/:id")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.VenueOwner), detailController.getVenueBookingDetails);

module.exports = router;