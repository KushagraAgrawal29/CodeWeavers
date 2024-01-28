const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const secToDuration = require("../utils/secToDuration");

exports.deleteCurrentUser = async(req,res,next) => {
    try{
        const user = await User.findById(req.user.id).exec();

        const profileDeletedUser = await Profile.findByIdAndDelete(user.profile);
        console.log("User deleted from profile",profileDeletedUser);

        const deleteUser = await User.findByIdAndDelete(user._id);
        console.log("Details of deleted User",deleteUser);

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully!"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error deleting User",
        });
    };
};

exports.getEnrolledCourses = async(req,res,next) => {
    try{
        let user = await User.findById(req.user.id).populate({
            path: 'courses',
            populate: {
                path: 'sections',
                populate: {
                    path: 'subSections'
                }
            }
        }).exec();

        user = user.toObject();

        //set total duration of each course
        for(let i = 0;i< user.courses.length;i++){
            let totalDurationInSeconds = parseInt(user.course[i].totalDuration);
            user.course[i].duration = secToDuration(totalDurationInSeconds);

            let subSectionCount = 0;
            for(let j = 0;j < user.courses[i].sections.length;j++){
                subSectionCount  += user.courses[i].sections[j].subSection.length;
            }

            const courseProgress = await CourseProgress.findOne({
                courseId: user.courses[i]._id,
                user: user._id
            });

            const courseProgressCount = courseProgress.completedVideos.length;

            let progressPercentage = 100;
            if(subSectionCount !== 0){
                progressPercentage = Math.round((courseProgressCount/subSectionCount) * 100 * 100) / 100;
            }

            user.courses[i].progressPercentage = progressPercentage;
        }

        return res.status(200).json({
            success: true,
            message: "Enrolled Courses data fetched successfully",
            count: user.courses.length,
            data: user.courses,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Error fetched enrolled courses details",
        })
    };
};