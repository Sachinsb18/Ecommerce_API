// user router to handle all the user related requests

import express from 'express';
import { createUser } from '../controller/user.controller.js';


const userRouter = express.Router();

userRouter.post('/signup',(req,res)=>{
   createUser(req,res);
})


export default userRouter;