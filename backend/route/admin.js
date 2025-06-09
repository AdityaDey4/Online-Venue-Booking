const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require("../myMiddleware/verifyRoles");

router.route("/")
    .post(verifyRoles(ROLES_LIST.Admin), adminController.handleNewAdmin);


router.route("/:email")
    .get(verifyRoles(ROLES_LIST.Admin), adminController.getAdmin);
    
module.exports = router;