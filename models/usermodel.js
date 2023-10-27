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
    role: {
        type: String,
        default: 'user',
    },
    isBlocked: {
        type:Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: []
    },
    address:[{type: mongoose.Schema.Types.ObjectId , ref: "address"}],

    wishlist:[{type: mongoose.Schema.Types.ObjectId , ref: "product" }],
},
{
    timestamps: true,
});

userSchema.pre("save" ,async function(next){
    const salt = bcrypt.genSaltSync(10);
this.password = bcrypt.hashSync(this.password, salt);

});


userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password)
};

//Export the model
const userschema = mongoose.model('Users', userSchema);
module.exports = userschema; 