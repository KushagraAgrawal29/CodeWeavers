const Profile = require("../models/Profile");
const User = require("../models/User")

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