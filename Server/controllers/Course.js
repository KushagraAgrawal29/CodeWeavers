const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//create course handler function
exports.createCourse = async(req,res) => {
    try{
        // const userId = req.user.id;
        //data fetch
        let {courseName,courseDescription,whatYouWillLearn,price,category} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // const tag = JSON.parse(_tag)
        // console.log("tag",tag);

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !thumbnail || !category){
            res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        } 

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId,{
            accountType:"Instructor",
        });
        console.log("Instructor details ",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor details not found",
            });
        }

        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details not found",
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            // tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {
                _id:instructorDetails._id
            },
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {
                new:true
            },
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
            error:error.message,
        });
    }   
};

//get all courses handler function
exports.getAllCourses = async(req,res) => {
    try{
        const allCourses = await Course.find(
            {status:"Published"},
            {
                courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviews:true,
                studentsEnrolled:true,
            }
        ).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"data for all courses fetched successfully",
            data:allCourses,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error:error.message,
        })
    }
};

//get course details
exports.getCourseDetails = async(req,res) => {
    try{
        //get id
        const {courseId} = req.body;

        //find course details
        const courseDetails = await Course.findOne(
                                            {_id:courseId})
                                            .populate(
                                                {
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails",
                                                    },
                                                }
                                            )
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                }
                                            })
                                            .exec();

        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:courseDetails,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}



