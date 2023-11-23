import express from 'express';
import userAuth from '../middelwares/authMiddleware.js';
import {createJobController,deleteJobController,getAllJobsController,jobStatsController,updateJobController} from '../controllers/jobsController.js';

// create router object
const router=express.Router();

// routes

// create jobs
router.post("/create-job",userAuth,createJobController);

// get jobs
router.get("/get-job",userAuth,getAllJobsController);

// update jobs
router.put("/update-job/:id",userAuth,updateJobController);

// delete jobs
router.delete("/delete-job/:id",userAuth,deleteJobController);

// jobs stats and filters
router.get("/job-stats", userAuth, jobStatsController);

export default router;