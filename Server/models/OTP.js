const {mongoose} = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerification");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*5,
    },
});

//a function to send emails

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification email from CodeWeavers",emailTemplate(otp));
        console.log("Email sent successfully: ",mailResponse.response);
    }
    catch(error){
        console.log("error while sending mails ",error);
        throw error;
    }
}

OTPSchema.pre("save",async function(next) {
    console.log("New document saved to database");

    //only send an email when a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP",OTPSchema);
module.exports = OTP;