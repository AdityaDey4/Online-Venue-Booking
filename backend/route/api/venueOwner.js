const express = require("express");
const router = express.Router();
const ownerController = require("../../controller/api/ownerController");
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require("../../myMiddleware/verifyRoles");

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), ownerController.getAllVenueOwners)
    .delete(verifyRoles(ROLES_LIST.Admin), ownerController.deleteVenueOwner);

router.route('/:email')
    .get(verifyRoles(ROLES_LIST.VenueOwner), ownerController.getVenueOwner);

module.exports = router;