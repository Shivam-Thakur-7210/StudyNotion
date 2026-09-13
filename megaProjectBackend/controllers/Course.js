const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utility/imageUploader");
const Category = require("../models/Category");


// createCourse handler fucntion
exports.createCourse = async (req , res )=>{
    try{
        // fetch data
        const {courseName , courseDescription ,whatYouWillLearn , price , categoryId , tag}= req.body;
        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !categoryId || !thumbnail){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })


        }

        // check for instructor 
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details :" , instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(categoryId);
        if(! categoryDetails ){
            return res.status(404).json({
                success:false,
                message:'Category  Details not found',
            });
        }

        // Upload Image to cloudinary
        const thumbnailImage= await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

      
        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );

        // update the category ka schema
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            }
        )

        // to do Hai

        // return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error:error.message,
        })
    }
};

// getAllCourses handler function 

exports.getAllCourses = async (req , res)=>{
    try{
        const allCourses = await Course.find({}, {courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor")
          .exec();
        
        return res.status(200).json({
             success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data ',
            error:error.message , 
        })
    }
}


// getCourseDetails
exports.getCourseDetails=async (req , res ) =>{
    try{
        // get id
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.findById(
                                {_id:courseId}
                            ).populate(
                                {
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails",
                                    }
                                }
                            )
                            .populate("category")
                            .populate("ratingAndReviews")
                            .populate({
                                path:"courseContent",
                                populate:{
                                    path:"subSection",
                                }
                            }).exec();

                // validation 
                console.log("Course Details yaha pe hai idhar :" , courseDetails);
                if (!courseDetails){
                    return res.status(404).json({
                        message:"could not found courseDetails",
                        success:false,
                        courseDetails,
                    })
                }

                // return response 
                return res.status(200).json({
                    success:true,
                    message:"Successfully fetched the course details",
                    data:courseDetails,
                });




    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Cannot fetch course details",
            error:error.message,
        })
    }

}


