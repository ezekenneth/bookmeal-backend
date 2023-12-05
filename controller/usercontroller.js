const { generateToken } = require("../config/jwttoken");
const userschema = require("../models/usermodel");
const asyncHandler = require('express-async-handler');
const validateDBid = require("../utils/validateDBid");



//register a user

const createUser = asyncHandler (async (req , res) => {
    const email = req.body.email;
    const finduser = await userschema.findOne({email});
         
    if (!finduser){
        //create new user
        const newUser = await userschema.create(req.body);
        res.json(newUser);
    }else{
        //if user already exist
       throw new Error('user already exists')
    };
   
    
});


//user login
 
const loginUser = asyncHandler ( async (req , res) => {
  const {email , password} = req.body;


  //check if user exist or not(invalid credentials)
  const findUser = await userschema.findOne({email});

  if (findUser && (await findUser.isPasswordMatched(password))){
    res.json({
        _id : findUser?._id,
        fullname: findUser?.fullname,
        email: findUser?.email,
        token: generateToken(findUser?._id)
    });
  } else{
    throw new Error('invalid credentials');
  };

});

//update a user

const updateauser = asyncHandler(async (req , res) => {
  const {_id} = req.user;
  validateDBid(_id);
  try {
    const updateauser = await userschema.findByIdAndUpdate(_id, {
      fullname: req.body?.fullname,
      email : req.body?.email,
    },
    {
      new: true
    }
    );
    res.json(updateauser);
  } catch (error) {
    throw new error(error);
  }
});

//get all users

const getallUsers = asyncHandler(async (req , res) => {
  try {
    const getUsers = await userschema.find();
    res.json(getUsers);

  } catch (error) {
    throw new Error(error)
  }
});

//get a single user by id

const getaUser = asyncHandler (async (req , res)=> {
    const {id} = req.params;
    validateDBid(id);
        try {
        const getaUser = await userschema.findById(id);
        res.json(getaUser)
        
    } catch (error) {
        throw new Error(error);
        
    }
})

//delete a user

const deleteaUser = asyncHandler (async (req , res)=> {
  const {id} = req.params;
  validateDBid(id);
      try {
      const deleteaUser = await userschema.findByIdAndDelete(id);
      res.json(deleteaUser)
      
  } catch (error) {
      throw new Error(error);
      
  }
});

 //block user

 const blockUser = asyncHandler(async (req, res) =>{
 const {id} = req.params;
 validateDBid(id);
 try {
  const blockuser =await userschema.findByIdAndUpdate(id, {isBlocked:true},{new:true});
  res.json(blockuser);
 } catch (error) {
  throw new Error(error);
 }

 });

   //unblock user
 const unblockUser = asyncHandler(async (req, res) =>{
  
  const {id} = req.params;
  validateDBid(id);

  try {
    const unblock = await userschema.findByIdAndUpdate(id, {isBlocked:false},{new:true});
    res.json({
      message: "user Unblocked",
    })
   } catch (error) {
    throw new Error(error);
   }
  
 });


module.exports = {createUser , loginUser, getallUsers, getaUser, deleteaUser, updateauser,blockUser,unblockUser};