
const express = require('express');
const { createUser, loginUser, getallUsers, getaUser, deleteaUser } = require('../controller/usercontroller');
const router = express.Router();

//login and register routes

router.post("/register", createUser);
router.post("/login", loginUser);

//get all users routes

router.get("/all-users", getallUsers);

//get single user by id
router.get("/:id", getaUser);

//delete single user by id
router.delete("/:id", deleteaUser);

module.exports =router;