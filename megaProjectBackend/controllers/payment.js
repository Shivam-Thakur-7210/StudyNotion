const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utility/mailSender") ;

exports.capturePayment = async(req , res )=>{
    // get courseId and userId
    const {courseId}=req.body;
    const userId = user.req.Id;
    // validation
        // valid courseId
        if(!courseId){
            return res.json({
                success:false,
                message:"please provide valid couuseId"
            })
        }
        
        // valid courseDetail
        let course;
        try{

            course = Course.findById(courseId);
            if(!course){
                return res.josn({
                    success:false,
                    message:"Could not find the course "
                })
            }

            // user already pay for the same course
            const uid =  mongoose.Types.ObjectId(userId);
            if(course.studensEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already present"
                })
            }

        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
            
        }
        
        // create order
        const amount=course.price;
        const currency="INR";

        const options={
            amount:amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId, 
            }

        }

        try{
            // initiate   the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            // return response
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescripion:course.courseDescripion,
                thumbnail : course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,

            })
        }catch(error){
            console.log(error);
            return res.json({
                success:false,
                message:"could not initiate order"
            })
        }

}

// verify the signature of razorpay and server

exports.verifySignature=async (req , res )=>{
    const webhookSecret = "132346792";
    const signature =req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("payment is Authorised");
        const {courseId , userId}=req.body.payload.payment.entity.notes;

        try{
            // fulfil the action
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                                            {_id:courseId},
                                            {$push:{studentsEnrolled:userId}},
                                            {new:true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:'Course not found ' , 
                })
            }

            console.log(enrolledCourse);
            // find the course and add the course to their list of enrolled course me 
            const enrolledStudent = await User.findOneAndUpdate(
                                            {_id:userId},
                                            {$push:{courses:courseId}},
                                            {new:true},
            )

            // mail send kardo confirmation wala 
            const emailResponse = await mailSender(
                                enrolledStudent.email,
                                "congo from codeExpert ",
                                "congo you are now onboarded into new codeExpert course"
            )

            console.log(emailResponse) ;
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added Successfully"
            })



        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }


    }else{
        return res.status(400).json({
            success:false,
            message:"Invalid Request",
        })
    }


}


exports.sendPaymentSuccessEmail = async(req ,res )=>{
     const {amount,paymentId,orderId} = req.body;
    const userId = req.user.id;

    if(!amount || !paymentId) {
        return res.status(400).json({
            success:false,
            message:'Please provide valid payment details',
        });
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email , 
            `student notion payment successful`,
            paymentSuccess(amount/100, paymentId, orderId, enrolledStudent.firstName, enrolledStudent.lastName),

        )
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

   
}