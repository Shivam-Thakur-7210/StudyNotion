const Profile = require("../models/Profile") ;
const User = require("../models/User") ;
const { uploadImageToCloudinary } = require("../utility/imageUploader");


exports.updateProfile=async(req , res )=>{
    try{
        // get data 
        const { dateOfBirth = "", about = "", contactNumber="",firstName,lastName,gender="" } = req.body;
        // get userid
        const id=req.user.id;
       
        // find profile
        const userDetails = await User.findById(id);
        if (!userDetails) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
        }

        const profileId = userDetails.additionalDetails;

        if (!profileId) {
        return res.status(404).json({
            success: false,
            message: "Profile reference missing in user",
        });
        }
        const profileDetails = await Profile.findById(profileId);
         if (!profileDetails) {
         return res.status(404).json({
            success: false,
            message: "Profile not found",
        });
        }
    
        // update Profile
        userDetails.firstName = firstName || userDetails.firstName;
		userDetails.lastName = lastName || userDetails.lastName;
       
        profileDetails.dateOfBirth = dateOfBirth || profileDetails.dateOfBirth;
		profileDetails.about = about || profileDetails.about;
		profileDetails.gender=gender || profileDetails.gender;
		profileDetails.contactNumber = contactNumber || profileDetails.contactNumber;

        // Save the updated profile
		await profileDetails.save();
		await userDetails.save();


        // return response
        return res.status(200).json({
            success:true,
            message:'profile updated Successfully',
            profileDetails,
            userDetails,

        })

        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}

exports.deleteAccount= async (req,res)=>{
    try{
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(403).json({
                success:false,
                message:'User not Found'
            })
        }
         

        // delete profile
        await Profile.findOneAndDelete({_id:userDetails.additionalDetails})

        // delete user
        await User.findOneAndDelete({_id:id});
        // return response
        return res.status(200).json({
            success:true,
            message:'User Successfully deleted'
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Account cannot be deleted please try again '
        })
    }
}


exports.getAllUserDetails= async (req,res)=>{
    try{
        // get id
        const id = req.user.id;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response 
        return res.status(200).json({
            message:"User Data Fetch Successfully ",
            success:true,
            userDetails,
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
	try {

		const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
	    const image = req.files.image;
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }
        const uploadDetails = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME
        );
        console.log(uploadDetails);

        const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

        res.status(200).json({
            success: true,
            message: "Image updated successfully",
            data: updatedImage,
        });
            
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}

