import userModel from "../models/userModel.js";

export const updateUserController=async(req,res,next)=>{
    const {firstName,email,lastName,location}=req.body;

    // Validations
    if(!firstName){
        next('Please Provide First Name');
    }

    if(!lastName){
        next('Please Provide Last Name');
    }

    if(!email){
        next('Please Provide E-mail');
    }

    if(!location){
        next('Please Provide Location');
    }

    // check the user
    const user=await userModel.findOne({_id:req.user.userId});
    user.firstName=firstName;
    user.lastName=lastName;
    user.email=email;
    user.location=location;

    // save
    await user.save();
    const token=user.createJWT();
    res.status(200).json({
        user,
        token
    });
}