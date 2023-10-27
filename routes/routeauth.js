
const express = require('express');
const { createUser, loginUser, getallUsers, getaUser, deleteaUser, updateauser, blockUser, unblockUser } = require('../controller/usercontroller');
const {authmiddleware, isadmin} = require('../middlewares/authmiddleware');
const router = express.Router();

//login and register routes

router.post("/register", createUser);
router.post("/login", loginUser);

//get all users routes

router.get("/all-users", getallUsers);

//get a user by id
router.get("/:id",authmiddleware,isadmin, getaUser);

//delete a user by id
router.delete("/:id", deleteaUser);

//update a user by id
router.put("/edith-user",authmiddleware, updateauser);

//block user routes
router.put("/block-user/:id",authmiddleware,isadmin, blockUser);

//unblock user routes
router.put("/unblock-user/:id",authmiddleware,isadmin, unblockUser);


module.exports =router;