
const userschema = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");

const authmiddleware = asyncHandler(async (req, res, next )=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const verifytkn = jwt.verify(token, process.env.JWT_KEY);
               const user = await userschema.findById(verifytkn?.id);
               req.user = user;
               next();

            }
        } catch (error) {
            throw new Error('not authorized token expired please login again');
            
        }
    }else{
        throw new Error('there is no token attached to the header');
    }
});
   //isadmin or not admin middleware
const isadmin = asyncHandler(async (req , res , next) => {
const {email} = req.user;
const adminuser = await userschema.findOne({email});
if (adminuser.role !== "admin") {
throw new Error("you are not admin")
} else {
    next();
}

});

module.exports = {authmiddleware , isadmin};

