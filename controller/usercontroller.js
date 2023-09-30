const userschema = require("../models/usermodel");
const asyncHandler = require('express-async-handler');

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
    res.json(findUser);
  } else{
    throw new Error('invalid credentials');
  };

});




module.exports = {createUser , loginUser}