const express = require("express");
const router = express.Router();

const userRegisterController = require("../controller/userRegisterController");

router.post("/", userRegisterController.handleNewUser);

module.exports = router;