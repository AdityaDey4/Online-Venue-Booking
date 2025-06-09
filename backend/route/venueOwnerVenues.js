const express = require("express");
const router = express.Router();
const venueController = require("../controller/api/venueController");
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require("../myMiddleware/verifyRoles");

router.route("/:email")
    .get(verifyRoles(ROLES_LIST.VenueOwner, ROLES_LIST.Admin), venueController.getVenueOwnerVenues);

module.exports = router;