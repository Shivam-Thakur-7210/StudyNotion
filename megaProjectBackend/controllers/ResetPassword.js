const User = require("../models/User");
const mailSender = require("../utility/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");   


// resetPasswordToken

exports.resetPasswordToken = async (req , res )=>{
   try{
         // get email from req body 
        const email = req.body.email;
        console.log("email:", email);
        // validation
        if(!email){     
            return res.json({
                success:false,
                message:'Please provide your email'
            })
        }

        // check user for this email , validation
        const user = await User.findOne({
            email:email
        })
        if(!user){
            return res.json({
                success:false,
                message:'Your Email is not registered with us'
            })
        }
        // generate token
        const token = crypto.randomBytes(20).toString("hex");
        console.log("token:", token);
        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                resetPasswordToken:token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            }, 

            {
                new:true
            }
        );

        // create url
        const url = `http://localhost:3000/update-password/${token}`
        // send mail containing the url
        await mailSender(email,"Password reset Link",
            `Password reset link ${url}`,
        );
        // return response
        return res.json({
            success:true,
            message:'Email sent successully, please check mail and reset your Password'
        })

   }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went Wrong while sending reset pwd mail'
        })

   }
   

  
}

// reset password

exports.resetPassword = async (req , res )=>{
    // data fetch
    const {password , confirmPassword, token} = req.body;
    // validation
    if (password !== confirmPassword){
        return res.json({
            success:false,
            message:'Password not matching',
        });
    }
    // get UserDetails from db using token
    const userDetails = await User.findOne({resetPasswordToken:token});
    // if no entry - invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message: "Token is Invalid",
        })
    }
    // token time check
    if(userDetails.resetPasswordExpires < Date.now()){
        return res.json({
            success:false,
            message:'Token is expired please regenerate your token '
        })
    }
    // hash Password
    // const hashedPassword =await  bcrypt.hash(password,10);
// hash Password
const hashedPassword = await bcrypt.hash(password.toString(), 10);

    // password update
    await User.findOneAndUpdate(
        {
            resetPasswordToken:token
        },
        {
            password:hashedPassword
        },
        {
            new:true
        }
    )

    // return response
    return res.json({
        success:true,
        message:'Password reset successfully'
    })
}