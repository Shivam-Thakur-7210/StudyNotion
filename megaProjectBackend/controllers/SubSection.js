const SubSection=require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utility/imageUploader");

exports.createSubSection= async  (req,res)=>{
    try{
        // fetch data from req body
        const {sectionId,title,timeDuration,description, videoFile}= req.body;

        // extract file/video
        const video = req.files.videoFile;
        // validation
        if (!sectionId || !title || !timeDuration || !description||videoFile){
            return res.status(403).json({
                success:false,
                message:'please fill all required fields'
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create a sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        // update section with this sub-section objectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{
            $push:{
                subSection:subSectionDetails._id,
            }
        },
        {new:true}
        );
        // return response
        return res.status(200).json({
            success:true,
            message:'new subSection created successfully',
            updatedSection,
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:"subSection can not be created " 
        })
    }

}

exports.updateSubSection = async (req,res)=>{
    try{
            // fetch data 
            const {title,subSectionId,  description, timeDuration,videoUrl}= req.body;

            const updateSubSectionDetails = {};
            if(title) updateSubSectionDetails.title = title;
            if(description) updateSubSectionDetails.description = description;
            if(timeDuration) updateSubSectionDetails.timeDuration  = timeDuration;
            if(videoUrl) updateSubSectionDetails.videoUrl = videoUrl;



            // update subsection 
            const  updateSubSectionData = await SubSection.findByIdAndUpdate(subSectionId ,updateSubSectionDetails, {
            new:true
            });

            // return response
            return res.status(200).json({
                success:true,
                message:'SubSection updated successfully',
                updateSubSectionData,
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:'SubSection can not be created , please try again',

            })
        }

}

exports.deleteSubSection = async (req,res )=>{
    try{
        // fetch SubSectionId 
        const {subSectionId}= req.params
        // delete SubSection 
        await SubSection.findByIdAndDelete(subSectionId);
        
        // return response 
        return res.status(200).json({
            success:true,
            message:'SubSection deleted Successfully'
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
                success:false,
                message:'delete SubSection fail , please try again '
        } )
    }
}