const Category = require("../models/Category");
const Course = require("../models/Course");


// create category ka handler function 

exports.createCategory = async (req , res )=>{
    try{
        // fetch data 
        const {name, description} = req.body;
        // validation 
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required '
            })
        }

        // create entry in DB
        const CategoryDetails = await Category.create({
            name:name,
            description:description ,

        });
        console.log(CategoryDetails);
        // return response

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

exports.showAllCategories = async (req , res)=>{
    try{
        const allTags = await Category.find({}, {name:true,description:true});
        res.status(200).json({
            success:true,
            message:'All Category returned successully',
            allTags,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// categoryPageDetails

exports.categoryPageDetails = async(req , res )=>{
    try{
        // get categoryId
        const {category}=req.body;

        // get courses for specifed categoryId
        const selectedCategory = await Category.findById(category)
                                    .populate("courses")
                                    .exec();


        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data Not Found",
            })
        }
        // get courses for different category
        const differentCategory= await Category.find({
                                _id:{$ne:category},

                                }).populate("courses")
                                .exec();
        // get top 10  selling courses
        const topSellingCourse = await Course.aggregate([
            {
                $addFields:{
                    enrolledCount:{$size: "$studentsEnrolled" }

                }
            },
            {
                $sort:{enrolledCount:-1} 
            },

            {
                $limit: 10
            },
        ])

        // return response 
        return res.status(200).json({
            success:true,
            message:"successfully geting desired courses according to category "
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,

        })
    }
}

