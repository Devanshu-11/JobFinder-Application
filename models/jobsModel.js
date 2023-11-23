import mongoose from 'mongoose';

const jobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Company Name is required']
    },
    position:{
        type:String,
        required:[true,'Job Positions is required'],
        maxlength: 100
    },
    status:{
        type:String,
        enum:['pending','reject','interview'],
        default:'pending'
    },
    workType:{
        type:String,
        enum:["Full-time","part-time","internship","Contract"],
        default:"Full-time"
    },
    workLocation:{
        type: String,
        default:"Mumbai",
        required:[true,"Work location is required"]
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

export default mongoose.model("Job",jobSchema);