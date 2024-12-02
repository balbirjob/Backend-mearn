const { default: mongoose } = require("mongoose");
//const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    
    password:{
        type: String,
        require: true,
    },
   
   
});





// json webtoken

userSchema.methods.generateToken = async function (){
    try {
        
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },process.env.JWT_SECRET_KEY,{
            expiresIn:"30d"

        }
    )
    } catch (error) {
        console.error(error);
        
    }
};




// define modal or collection
const User = new mongoose.model("User",userSchema);
module.exports = User;