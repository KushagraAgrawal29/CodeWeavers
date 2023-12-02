const express = require("express");
const router = express.Router();

const {capturePayment,verifySignature,sendPaymentSuccessfullEmail} = require("../controllers/Payments");
const {auth,isInstructor,isStudent,isAdmin} = require("../middlewares/auth");

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifySignature);
// router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessfullEmail);

module.exports = router;