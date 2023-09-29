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

module.exports = createUser;