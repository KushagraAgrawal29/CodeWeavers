const Mongoose = require("mongoose");
const Category = require("../models/Category");

exports.createCategory = async(req,res) => {
    try{
        //data fetch
        const {name,description} = req.body;

        //validation
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //create entry in db
        const categoryDetails =  await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//get all categories handler function
exports.showAllCategories = async (req,res) => {
    try{
        // console.log("Inside Show All Categories")
        const allCategories = await Category.find({},{name:true,description:true});
        return res.status(200).json({   
            success:true,
            message:"All Categories fetched successfully",
            data:allCategories,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

//category page details
exports.categoryPageDetails = async(req,res)=>{
    try{
        //get category id
        const {categoryId} = req.body;
        console.log("Printing catgeory id:",categoryId);

        //get course for specified categoryid
        const selectedCategory = await Category.findById(categoryId)
                                                        .populate("courses")
                                                        .exec();

        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Category Not found",
            });
        }

        //get courses for different categories
        const differentCategories = await Category.find({
                                    _id:{ne:categoryId},
                                    })
                                    .populate("courses")
                                    .exec();
        
        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            },
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

