const express = require("express");
const router = express.Router();

const {
    login,
    signup,
    sendOTP,
    changePassword,
} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");

const { deleteCurrentUser } = require("../controllers/User");

const {auth} = require("../middlewares/auth");

// <------------Authentication routes ----------------->

//user login
router.post("/login",login);

//user signup
router.post("/signup",signup);

//sending OTP to user's mail
router.post("/sendOTP",sendOTP);

//changing the password
router.post("/changePassword",auth,changePassword);

// <---------------- Reset Password -------------->

router.post("/reset-password-token",resetPasswordToken);

//route for reseting user's password after verification
router.post("/reset-password",resetPassword);

router.delete("/deleteCurrentUser",auth,deleteCurrentUser);

module.exports = router;



