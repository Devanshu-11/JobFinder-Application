// import the modules
import express from 'express';
import "express-async-errors";
import dotenv from 'dotenv';
import colors from 'colors';
import cors from "cors";
import morgan from "morgan";
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import errorMiddleware from './middelwares/errorMiddleware.js';

// config dotenv
dotenv.config();

// mongodb connection
connectDB();

// create an instance of express application
const app=express();

// use middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// create routes
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/job',jobsRoutes);

// validations middleware
app.use(errorMiddleware);

const PORT=process.env.PORT||8080;

app.listen(PORT,()=>{
    console.log(`Node Server running in ${process.env.DEV_MODE} Mode on Port number ${PORT}`.bgMagenta.white);
});