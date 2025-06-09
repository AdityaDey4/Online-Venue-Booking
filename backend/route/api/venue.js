const express = require("express");
const router = express.Router();

const venueController = require('../../controller/api/venueController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require("../../myMiddleware/verifyRoles");
const verifyJWT = require('../../myMiddleware/verifyJWT')

router.route('/')
    .get(venueController.getAllVenues)
    .post(verifyJWT, verifyRoles(ROLES_LIST.VenueOwner), venueController.postVenue)
    .put(verifyJWT, verifyRoles(ROLES_LIST.VenueOwner, ROLES_LIST.Admin), venueController.updateVenue)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.VenueOwner), venueController.deleteVenue)

router.route('/:id')
    .get(venueController.getVenue)

module.exports = router;