
const express = require('express');
const { createUser, loginUser, getallUsers } = require('../controller/usercontroller');
const router = express.Router();



router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/all-users", getallUsers);

module.exports =router;