const express = require("express");
const router = express.Router();
const userController = require("../../controller/api/userController");
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require("../../myMiddleware/verifyRoles");

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), userController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

router.route('/:email')
    .get(userController.getUser);

module.exports = router;