// user router to handle all the user related requests

import express from 'express';
import { createUser, loginUser } from '../controller/user.controller.js';


const userRouter = express.Router();

userRouter.post('/signup',(req,res)=>{
   createUser(req,res);
})

userRouter.post("/signin",(req,res)=>{
    loginUser(req,res);
})


export default userRouter;