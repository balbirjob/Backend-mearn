const {z} = require("zod");

//creating a object schema

const singnupSchema = z.object({

    username: 
            z.string({required_error:"Name is required"})
            .trim().min(3, {message:"Name must be have 3 chars."})
            .max(255, {message:"Name must not be more than 255 char"}),

    phone: 
            z.string({required_error:"Phone is required"})
            .trim().min(10, {message:"Phone must be have 10 chars."})
            .max(10, {message:"Phone must not be more than 10 char"}),        
    
    email: 
            z.string({required_error:"Email is required"})
            .trim()
            .email({message:"Invalid email address"})
            .min(3, {message:"Email must be have 3 chars."})
            .max(255, {message:"Email must not be more than 255 char"}),

    password: 
            z.string({required_error:"Password is required"})
            .min(6, {message:"Password must be have 6 chars."})
            .max(12, {message:"Password must not be more than 12 char"})
           
});


module.exports = singnupSchema;