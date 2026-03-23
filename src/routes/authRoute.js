import express from 'express';
import {loginUser, registerUser} from '../controller/authController.js'
import { authValidations, loginValidator, registerValidator } from '../middleware/authMiddleware.js';
const authRoute=express.Router();
authRoute.post('/registerUser',registerValidator(),authValidations,registerUser);
authRoute.post('/loginUser',loginValidator(),authValidations,loginUser);

export default authRoute;