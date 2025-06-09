const express = require("express");
const router = express.Router();
const verifyRoles = require("../../myMiddleware/verifyRoles");
const ROLES_LIST = require('../../config/roles_list')
const verifyJWT = require('../../myMiddleware/verifyJWT')

const feedbackController = require('../../controller/api/feedbackController');

router.route('/')
    .get(feedbackController.getAllFeedback)
    .post(verifyJWT, verifyRoles(ROLES_LIST.User), feedbackController.postFeedback);

router.route('/:email')
    .get(verifyJWT, verifyRoles(ROLES_LIST.User), feedbackController.getFeedback);

module.exports = router; 