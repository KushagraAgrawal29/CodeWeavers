const express = require("express");
const router = express.Router();

const {auth,isInstructor} = require("../middlewares/auth");
const {
    deleteAccount,
    getUserDetails,
    updateProfile,
    displayProfilePicture,
} = require("../controllers/Profile");

router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getUserDetails);
router.put("/displayProfilePicture", auth, displayProfilePicture)

module.exports = router;