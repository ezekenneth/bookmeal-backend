const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')

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

userSchema.pre("save" ,async function(next){
    const salt = bcrypt.genSaltSync(10);
this.password = bcrypt.hashSync(this.password, salt);

});

const isPasswordMatched = (
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password)
});

//Export the model
const userschema = mongoose.model('User', userSchema,"isPasswordMatched");
module.exports = userschema; 