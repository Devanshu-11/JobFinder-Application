import express from "express";
import userAuth from '../middelwares/authMiddleware.js';
import {updateUserController} from "../controllers/userController.js";

// create router object
const router=express.Router();

// routes

// update users
router.put('/update-user',userAuth,updateUserController)

export default router;