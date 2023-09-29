const userschema = require("../models/usermodel");

userschema()


const createUser = async (req , res) => {
const email = req.body.email;
const finduser = await userschema.findOne({email});
     
if (!finduser){
    //create new user
    const newUser = await userschema.create(req.body);
    res.json(newUser);
}else{
    //if user already exist
    res.json({
        message:'user already exist',
        success:false,
    })
}
   
    
};

module.exports = createUser;