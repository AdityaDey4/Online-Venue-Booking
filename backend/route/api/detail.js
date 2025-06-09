const express = require("express");
const router = express.Router();
const detailController = require("../../controller/api/detailController");
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require("../../myMiddleware/verifyRoles");

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), detailController.getAllDetail)
    .post(verifyRoles(ROLES_LIST.User), detailController.postDetail)

router.route("/:id")
    .get(detailController.getDetail);

module.exports = router;