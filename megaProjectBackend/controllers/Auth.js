const User= require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const Profile= require("../models/Profile");
const JWT= require("jsonwebtoken");
const mailSender= require("../utility/mailSender");
const otpGenerator = require("otp-generator");



//  Send OTP

exports.sendOTP = async (req , res) =>{
    try{
          // fetch email from request ki body
        const {email}= req.body;

        // check if user already exist 
        const checkUserPresent = await User.findOne({email});

        // if user already exist , then return a response

        if (checkUserPresent){
            return res.status(401).json({
                success:true,
                message:"User already registered",
            })
        }
        // generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        console.log("OTP generated:" ,  otp)

        // check unique otp or not 
        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result=await OTP.findOne({
                otp:otp
            });
        }

        const otpPayload = {email,otp};

        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return response successfull
        res.status(200).json({
            success:true,
            message:"OTP sent Successfull",
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }


    
}
  

// SignUp
exports.signUp = async (req,res)=>{
    try{
            // fetch data from request body
            const {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                contactNumber,
                otp,
            } = req.body;

            // validate karlo 
            if(!firstName || !lastName || !email || !confirmPassword || !otp ){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required ",
                })
            }
            // 2 password match
            if(password !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Password and confirmPassword value does not match , please try again"
                }); 
            }
            // check user already exist or not
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.json({
                    message:"user already existed ",
                    success:false,
                })
            }
            // find most recent otp stored for user
                const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);     
                // validate otp
                console.log("recentOtp kya h:", recentOtp);
            if (!recentOtp) {
                // otp not found  
                return res.status(403).json({
                    success: false,
                    message: "otp not found",
                })
            } else if (otp !== recentOtp.otp) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP",
                })
            }
            
            // Hash Password
            const hashedPassword =await  bcrypt.hash(password,10);
            // entry create in DB
            const profileDetails =await Profile.create({
                gender:"",
                dateOfBirth:"",
                contactNumber:"",
                about:"",
            })


            const user =await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
               
                accountType,
                contactNumber,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/8.x/initials/svg?seed=${firstName[0]}${lastName[0]}`
            })
            // return res
            return res.status(200).json({
                success:true,
                message:"User registered Successfully",
               
            })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"User cannot be registered , please try again",
        })
    }
}


// login
exports.login=async (req,res)=>{
    try{
        // get data from request body
        const email = req.body.email;
        const password = req.body.password;

        // validation data
        if (!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required please try again ",
            })   
        }
        // user check exist or not
        const user =await User.findOne({email});
       
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered , please SignUp first ",
            })
        } 
        // generate JWT after password matching 
        if (await bcrypt.compare(password,user.password)){
            const payload = {
                user : user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token=  JWT.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token=token; 
            user.password=undefined;


            // generate cookie and send response
            const options = {
                expires:new Date(Date.now()  + 3*24*60*60*1000),
                httpOnly:true, 
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            })
        }else{
            return res.status(401).json({
                success:true,
                message:'Password is incorrect '
            })
        }

        


    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:'Login Failures please try again ',
        })
    }
}

// change Password 
exports.changePassword = async (req,res)=>{
    // get data from reqest body
    const userId = req.user._id;
    const user = await User.findById(userId);

    const password = user.password;
    // get oldPassword , newPassword , confirmPassword
    const {oldPassword , newpassword, confirmPassword} = req.body;

    
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
    return res.status(401).json({
        success: false,
        message: "Old password does not match",
    });
    }

    // validation
   

    if(newpassword!==confirmPassword){
        return res.json({
            success:false,
            message:'newPassword and confirmPassword should be same '
        })
    }
    
    // update pwd in DB
    const updatedPassword = User.findByIdAndUpdate(user ,{ password:newPassword})
    // send mail - Password updated
    await mailSender(
        user.email,"password updated", "your password has been changed , if it is not you then kindly contact your concern department"
    )
    // return response
    return res.status(500).json({
        success:true,
        message:'password Successfully changed '
    })
}