const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create sub-section

exports.createSubSection = async(req,res) => {
    try{
        //fetch data from request body
        const {sectionId,title,timeDuration,description} = req.body;

        //extract file/video
        const video = req.files.videoFile;

        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        console.log(video);

        //upload video on cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        //create a sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })

        //update section with this sub section objectId

        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {
                                                                    $push:{
                                                                        subSection:subSectionDetails._id,
                                                                    }
                                                                },{new:true}).populate("subSection");


        //return response
        return res.status(200).json({
            success:true,
            message:"Sub section created successfully",
            updatedSection,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}

exports.updateSubSection = async(req,res) => {
    try{
        const {sectionId,subSectionId,title,description} = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
            });
        }

        if(title !== undefined){
            subSection.title = title;
        }

        if(description !== undefined){
            subSection.description  = description;
        }

        if(req.files && req.files.videoFile !== undefined){
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME,
            )
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = timeDuration;
        };

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        console.log("updated section",updatedSection);

        return res.json({
            success:true,
            message:"Section updated successfully",
            data:updatedSection,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error has occured while updating the section",
        });
    }
}

exports.deleteSubSection = async(req,res) => {
    try{
        const {subSectionId,sectionId} = req.body;

        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull:{
                    subSection:subSectionId,
                },
            }
        )

        const subSection = await SubSection.findByIdAndDelete({_id:subSectionId});

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
            });
        }

        //find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success:true,
            message:"SubSection deleted Successfully",
            data:updatedSection,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured while deleting the subsection",
        })
    }
};
