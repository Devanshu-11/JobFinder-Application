import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

// create jobs
export const createJobController=async(req,res,next)=>{
    const {company,position,sort}= req.body;

    // validations
    if(!company){
        next('Please Provide Company Name');
    }

    if(!position){
        next('Please Provide Position');
    }

    // checked id
    req.body.createdBy=req.user.userId;
    const job=await jobsModel.create(req.body);
    res.status(201).json({job});
}

// gets jobs
export const getAllJobsController=async(req,res,next)=>{
    const {status,workType,search,sort}=req.query;
    const queryObject={createdBy:req.user.userId}

    // logic filters
    if(status&&status!=='all'){
        queryObject.status=status;
    }

    if(workType&&workType!=="all") {
        queryObject.workType=workType;
    }

    if(search){
        queryObject.position={$regex:search,$options:"i"};
    }

    let queryResult=jobsModel.find(queryObject);

    // sorting
    if(sort=='latest'){
        queryResult=queryResult.sort("-createdAt");
    }

    if (sort==="oldest") {
        queryResult=queryResult.sort("createdAt");
    }

    if (sort==="a-z") {
        queryResult=queryResult.sort("position");
    }
    
    if (sort==="z-a") {
        queryResult=queryResult.sort("-position");
    }

    const jobs=await queryResult;

    res.status(200).json({
        jobs,
    });
}

// update jobs
export const updateJobController=async(req,res,next)=>{
    const {id}=req.params;
    const {company,position}=req.body;

    // validations
    if(!company){
        next('Please Provide Company Name');
    }

    if(!position){
        next('Please Provide Position');
    }

    // find job
    const job=await jobsModel.findOne({_id:id});

    // if job is not there
    if(!job){
        next(`No Job Found With This ID ${id}`);
    }

    // the user which has created, only that can update it
    if(!req.user.userId===job.createdBy.toString()){
        next("Your Not Authorized to update this job");
        return;
    }

    const updateJob=await jobsModel.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true,
    });

    // response
    res.status(200).json({updateJob});
}

// delete jobs
export const deleteJobController=async(req,res,next)=>{
    const {id}=req.params;

    // find job
    const job=await jobsModel.findOne({_id:id});

    // if job not found
    if(!job){
        next(`No Job Found With This ID ${id}`);
    
    }

    // the user which has created, only that can update it
    if (!req.user.userId === job.createdBy.toString()){
        next("Your Not Authorize to delete this job");
        return;
    }

    await job.deleteOne();
    res.status(200).json({message:"Success,Job Deleted!"});
}

// jobs stats and filters
export const jobStatsController=async(req,res)=>{
    const stats=await jobsModel.aggregate([
        // search by user jobs
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group:{
                _id:"$status",
                count:{$sum:1},
            },
        },
    ]);

    // default stats
    const defaultStats={
        pending:stats.pending||0,
        reject:stats.reject||0,
        interview:stats.interview||0,
    }

    // monthly
    let monthlyApplications=await jobsModel.aggregate([
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group:{
              _id:{
                year:{$year:"$createdAt" },
                month:{$month:"$createdAt" },
              },
              count:{
                $sum:1,
              },
            },
        },
    ]);

    monthlyApplications=monthlyApplications.map(item=>{
        const {_id:{year,month},count}=item
        const date=moment().month(month-1).year(year).format('MMM Y')
        return {date,count}
    }).reverse();

    res.status(200).json({totalJob:stats.length,defaultStats,monthlyApplications});
}