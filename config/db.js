import mongoose from 'mongoose';
import colors from 'colors';

const connectDB=async(req,res)=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta
        .white)
    }catch(error){
        console.log(`MongoDB error ${error}`.bgRed.white);
    }
}

export default connectDB;