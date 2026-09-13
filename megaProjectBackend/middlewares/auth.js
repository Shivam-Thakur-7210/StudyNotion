jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth =  async (req , res , next)=>{
    try{
        // extract token
        const token = req.cookies.token || req.body.token ||  req.header("Authorization")?.replace("Bearer ", "");

        // if token missing then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            })
        }

        // verify the token
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

      

        }catch(err){
            // verification issue
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            })
        }

        next();

    }catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validatin the token',
        })
    }
}
// isStudent
exports.isStudent = (req , res, next )=>{
    try{
        if (req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for Students Only'
            })
        }

        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User AccountType cannot be verified , please try again",
        })
    }
}
// isInstructor


exports.isInstructor = (req , res, next )=>{
    try{
        if (req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for isInstructor Only'
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User AccountType cannot be verified , please try again",
        })
    }
}


// isAdmin
exports.isAdmin = (req , res, next )=>{
    try{
        if (req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for Admin Only'
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User AccountType cannot be verified , please try again",
        })
    }
}