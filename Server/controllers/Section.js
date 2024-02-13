const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async(req,res) => {
    try{
        //data fetch 
        const {sectionName,courseId} = req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing required properties",
            });
        }

        //create a new section with the given name
        const newSection = await Section.create({sectionName});

        //update course with section ObjectId
        //add the new section to the course's content array
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent:newSection._id,
                                                }
                                            },
                                            {
                                                new:true
                                            },
                                        ).populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                }
                                        })
                                        .exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create section,please try again",
            error:error.message,
        });
    }
};

exports.updateSection = async(req,res) => {
    try{
        //data fetch
        const {sectionName,sectionId,courseId} = req.body;

        //data validation
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties",
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section details updated successfully",
            data:course,
        });
    }
    catch(error){
        console.log("Error updating section",error);
        return res.status(500).json({
            success:false,
            message:"Unable to update section,please try again",
            error:error.message,
        });
    }
}

exports.deleteSection = async (req,res) => {
    try{
        //get id - assuming that we are giving id in params
        const {sectionId,courseId} = req.body;

        await Course.findByIdAndUpdate(courseId,{
                $pull:{
                    courseContent:sectionId,
                }
        })
        
        const section = await Section.findById(sectionId);
        console.log(sectionId,courseId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not Found",
            })
        }

        //delete subsection
        await SubSection.deleteMany({_id:{$in:section.subSection}});
        
        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        return res.status(200).json({
            success:false,
            message:"Section deleted successfully",  
            data:course,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete section,please try again",
            error:error.message,
        });
    }
}