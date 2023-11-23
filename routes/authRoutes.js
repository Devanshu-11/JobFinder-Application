import express from 'express';
import {loginController,registerController} from "../controllers/authController.js";

// create router object
const router=express.Router();

// routes

// Register
router.post('/register',registerController);

// login
router.post('/login',loginController);

//export
export default router;