const RatingAndReview = require("../models/RatingAndReview");

const Course = require("../models/Course");

// createRating
exports.createRating = async(req , res )=>{
    try{
        // get user id 
        const userId  =  req.user.id;
        // fetchdata from req body
        const {rating,review,courseId} = req.body;
        // check if user is enrolled or not 
        const courseDetails = await Course.findOne(
            {
                _id:courseId,
                studentsEnrolled:{$elemMatch:{$eq:userId}},
            }
        );

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course'
            })
        }
        // check if user already reviewd the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        })

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'Course is already reviewd by the user', 
            })
        }
        // create rating and review 
        const ratingReview= await RatingAndReview.create({
            rating,review,course:courseId,
            user:userId,

        })

        // update course with this rating/review
        const updatedCourseDetails= await Course.findByIdAndUpdate(courseId,{$push:{
                                ratingAndReviews:ratingReview,

        }})

        console.log(updatedCourseDetails)
        // return response 
        return res.status(200).json({
            success:true,
            message:"Rating and Review course created Successfully",
            ratingReview,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// getAverageRating
exports.getAverageRating = async (req , res )=>{
    try{
        //   get course ID
        const courseId = req.body.courseId;
        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },

            {
                $group:{
                     _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        // return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        // if no rating/review exist 
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0 , no ratings given till now',
            averageRating:0,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// getAllRating 
exports.getAllRating = async(req , res )=>{
    try{
        const allRating = await RatingAndReview.find({})
        .populate({
            path:'user',
            select:"firstName lastName email image"
        })
        .populate({
        path: "course", // jis course pe rating di gayi
        select: "courseName", 
        })
        .exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"get all rating successfully",
            allRating,
        })



    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}