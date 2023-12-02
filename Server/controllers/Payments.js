const {instance} = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../controllers/Course");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default:Mongoose } = require("mongoose");

//capture the payment and initiate the razorpay order

exports.capturePayment = async(req,res) => {
    //get courseId and userId

    const {course_id} = req.body;
    const userId = req.user.id;

    //validation
    //valid courseId

    if(!course_id){
        return res.status(401).json({
            success:false,
            message:"Please provide valid course Id",
        });
    }

    //valid coursedetail
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.status(401).json({
                success:false,
                message:"Could not find the course",
            });
        }

        //user already paid for the same course
        const uid = new Mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uid)){
            return res.status(401).json({
                success:false,
                message:"Student is already enrolled",
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not initiate order",
        })
    }
};

// verify signature of razorpay and server

exports.verifySignature = async (req,res) => {
    const webhookSecret = "12345678";
    const signature = req.header["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is authorised");

        const {courseId,userId} = req.body.paylad.payment.entity.notes;

        try{
            //fulfill the action

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                                                {_id:courseId},
                                                {$push:{studentEnrolled:userId}},
                                                {new:true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                });
            }

            console.log(enrolledCourse);

            //find the student and add the course to their list enrolled course
            const enrolledStudent = await User.findOneAndUpdate(
                                                {_id:userId},
                                                {$push:{courses:courseId}},
                                                {new:true},
            )

            console.log(enrolledStudent);

            const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from CodeWeavers",
                                        "You are onboarded on Codeweaver course"
            );

            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature verified and course added",
            })

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request",
        })
    }
};