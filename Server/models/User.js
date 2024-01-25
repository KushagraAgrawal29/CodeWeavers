const {mongoose} = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema({
    // Define the name field with type String, required, and trimmed
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,  
        trim:true,
    },

    // Define the email field with type String, required, and trimmed
    email:{
        type:String,
        required:true,
        trim:true,
    },

    // Define the password field with type String and required
    password:{
        type:String,
        required:true,
    },

    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true
    },
    // active:{
    //     tyoe:Boolean,
    //     default:true,
    // },
    // approved:{
    //     type:Boolean,
    //     default:true,
    // },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    token:{
        type:String,
    },
    image:{
        type:String,
        required:true,
    },
    resetPasswordExpireyTime:{
        type:Date,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"courseProgress",
        }
    ],
},{timestamps:true});

module.exports = mongoose.model("user",userSchema);
