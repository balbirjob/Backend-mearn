const User = require("../models/user-modal")
const bcrypt = require("bcryptjs")




//register
const register = async(req, res) => {
    try {
        //console.log(req.body);
        
        const { username, phone, email,  password } = req.body;

        //email is exist or not check
        const userExist = await User.findOne({email}) //  => this emain filed come from database [email]:[email] =>this come from from
        if(userExist){
            return res.status(400).json({
                msg:"email already exist"
            });
        }

        // hash the password
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound); // password comeing from front end form

        const userCreated = await User.create({username, phone, email, password:hash_password});
        res.status(201).json({
            msg:"Registation Successful", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString(),
        });
        //{token: await userCreated.generateToken() } this is web token 
        
    } catch (error) {
        res.status(500).json("internal server error");
        
    }

}


// Login
const login = async (req, res)=>{
    try {

        const {email,password} = req.body;
        const userExist = await User.findOne({email})
        //console.log(userExist);
        

        if(!userExist){
            return res.status(400).json({
                messsage: "Invalid Credentials"
            });
        }

        const user = await bcrypt.compare(password, userExist.password);
        // user exist then it will work
        if(user){
            res.status(200).json({
                msg:"Login Successful", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),
            });
        }else{
            res.status(401).json({
                messsage:"Invalid emai or password"
            });
        }

        
    } catch (error) {
        res.status(500).json("internal server error");

        // for error middleware
        next(error);
    }
};


// To send user data - userLogin
// const user = async(req ,res){
//     try{
//         const userData = req.user;
//         console.log(userData)

//     }catch(error){
//         console.log(`error from the user route ${error}`);
        
//     }
// }



module.exports = {register,login};