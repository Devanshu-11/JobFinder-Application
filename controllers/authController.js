import userModel from '../models/userModel.js';

// for register
export const registerController=async(req,res,next)=>{
    const {firstName,email,password}=req.body;

    // validations
    if(!firstName){
        next('First Name is required');
    }

    if(!email){
        next('E-mail is required');
    }

    if(!password){
        next('Password is required and should be greater than 6 character');
    }

    // check if there is existing user or not
    const existingUser=await userModel.findOne({email});
    if(existingUser){
        next('E-mail Already Registered, Please Login');
    }

    // if there is not existing user, then create new user
    const user=await userModel.create({firstName,email,password});

    // create token
    const token = user.createJWT();
    res.status(201).send({
        success:true,
        message:'User Created Successfully',
        user:{
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            location:user.location,
        },
        token
    });
}

// for login
export const loginController=async(req,res,next)=>{
    const {email,password}=req.body;

    // validations
    if(!email||!password){
        next("Please Provide All Fields");
    }

    // find user by email
    const user=await userModel.findOne({email}).select("+password");
    if(!user){
        next('Invalid Username or password')
    }

    // if we find user, check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        next("Invalid Useraname or Password");
    }

    user.password = undefined;
    const token=user.createJWT();
    res.status(200).json({
        success: true,
        message: "Login Successfully",
        user,
        token,
    });
}