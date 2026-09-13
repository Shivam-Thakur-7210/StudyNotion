const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req,res)=>{
    try{
        // Data fetch
        const {sectionName , courseId}= req.body;
        // data validation
        if (!sectionName || !courseId){
            return res.status(403).json({
                success:false,
                message:'Please fill all required fields',
            })
        }
        // create section
        const newSection = await Section.create({sectionName});

        console.log("New Section created :" , newSection);
        // update course with section objectid 
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                        courseId,
                                        {
                                            $push:{
                                                courseContent:newSection._id,
                                            }
                                        },
                                        {new:true} ,


        )

        

        console.log("updaupdatedCourseDetails yaha  pe hai ",  updatedCourseDetails);
        // HW: use populate to replace  populate sections\subsectoins both in updatedCourseDetails

        // return response
        return res.status(200).json({
            success:true,
            message:'newSection created successfully'
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'unable to create section please try again',
            error:error.message
        })

    } 
}

exports.updateSection = async (req,res)=>{
    try{    
        // data input
        const {sectionName , sectionId} = req.body;

        // data validation
        if (!sectionId || !sectionName){
            return res.status(403).json({
                success:false,
                message:'please fill all required fields',
            })
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        console.log("Updated Section is :" , section);
        // return response
        return res.status(200).json({
            success:true,
            message:'section updated successfully'
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
                success:false,
                message:'unable to update section please try again',
                error:error.message
            })
    }
}

exports.deleteSection = async (req,res )=>{
    try{

        // get Id-assuming that we are sending Id in params
        const {sectionId} = req.params;

        // use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId)

        // return response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'section can not deleted please try again ',
            error:error.message
        })
    }
}