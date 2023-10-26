
const express = require('express');
const { createUser, loginUser, getallUsers, getaUser, deleteaUser, updateauser } = require('../controller/usercontroller');
const router = express.Router();

//login and register routes

router.post("/register", createUser);
router.post("/login", loginUser);

//get all users routes

router.get("/all-users", getallUsers);

//get a user by id
router.get("/:id", getaUser);

//delete a user by id
router.delete("/:id", deleteaUser);

//update a user by id
router.put("/:id", updateauser);


module.exports =router;