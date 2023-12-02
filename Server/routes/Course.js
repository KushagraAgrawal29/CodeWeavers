const express = require("express");
const router = express.Router();

//course Controllers import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
} = require("../controllers/Course");

//import category controllers
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category");

//import section controllers
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");

//import sub-section controllers
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/SubSection");

//import rating controllers
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview");

//importing middlewares

const {auth,isInstructor,isStudent,isAdmin} = require("../middlewares/auth");

// <------------------ course routes ------------------->

//courses can only be created by instructor

router.post("/createCourse",auth,isInstructor,createCourse);

//add a section to the course
router.post("/createSection",auth,isInstructor,createSection);

//update a section
router.post("/updateSection",auth,isInstructor,updateSection);

//delete section
router.post("/deleteSection",auth,isInstructor,deleteSection);

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

//delete sub section
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

//add a subsection to a section
router.post("/addSubSection",auth,isInstructor,createSubSection);

//get all registered courses
router.get("/getAllCourses",getAllCourses);

//get details for a specific courses
router.post("/getCourseDetails",getCourseDetails);

// <----------------category routes (only by admin) ---------------->

// Category can Only be Created by Admin

// router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)
router.post("/createCategory", auth, isAdmin, createCategory)

// rating and review
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router;