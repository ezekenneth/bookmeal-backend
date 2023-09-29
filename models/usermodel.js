const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model

var userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,   
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true,
    },
});

//Export the model
const userschema = mongoose.model('User', userSchema);
module.exports = userschema; 