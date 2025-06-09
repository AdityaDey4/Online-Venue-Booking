const express = require("express");
const router = express.Router();
const featureController = require("../../controller/api/featureController");
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require("../../myMiddleware/verifyRoles");
const verifyJWT = require('../../myMiddleware/verifyJWT')

router.route('/')
    .post(verifyJWT, verifyRoles(ROLES_LIST.VenueOwner, ROLES_LIST.Admin), featureController.postFeature);
router.route('/:id')    
    .get(featureController.getFeature);

module.exports = router; 