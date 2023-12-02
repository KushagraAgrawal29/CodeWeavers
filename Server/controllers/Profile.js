const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.updateProfile = async(req,res) => {
    try{
        //data fetch
        const {dateOfBirth="",about="",contactNumber="",gender=""} = req.body;
        //get userId
        const id = req.user.id;

        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //find profile
        const userDetails = await User.findById(id);
        // const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(userDetails.additionalDetails);

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();

        const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            status:false,
            error:error.message,
        });
    }
};

//delete account

exports.deleteAccount = async (req,res) => {
    try{
        //get id
        const id = req.user.id;

        //validation
        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete user
        await User.findByIdAndDelete({_id:id});

        //return response
        return res.status(200).json({
            success:true,
            message:"User deleted Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted successfully",
        });
    }
};

exports.getUserDetails = async (req,res) => {
    try{
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:userDetails,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

//update display picture
exports.displayProfilePicture = async(req,res) => {
    try{
        const profilePicture = req.files.profilePicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            profilePicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true},
        )
        res.send({
            success:true,
            message:`Image updated successfully`,
            data:updatedProfile,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}