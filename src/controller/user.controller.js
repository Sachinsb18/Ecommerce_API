// controller to handle all the user signup and signin request
import dotenv from 'dotenv';
dotenv.config();
// import user repository
import { addUser, findByEmail} from "../model/user.repository.js";

// import bcrypt to hash the user password 
import bcrypt from 'bcrypt';

// import jwt to create a token
import jwt from 'jsonwebtoken'

// controller function to create/ add a user 
const createUser = async (req, res) => {
    // console.log(req.body);
    const {username,email,password} = req.body;
    // hash the user password for security purpose
    const hashedPassword = await bcrypt.hash(password,12);
    const user = {
        username: username,
        email: email,
        password: hashedPassword
    };
    try{
        const newUser = await addUser(user.username, user.email, user.password);
        if(newUser){
            res.status(201).json({message:`User ${user.username} created successfully`});
        }
        else{
            res.status(404).json({message:"something went wrong"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

// controller function for user to login
const loginUser = async (req,res)=>{
        const {email, password} = req.body;
        try{ 
            const users =  await findByEmail(email);
            if(!users){
                res.status(404).json({message: 'Inavlid Credentials. Please check the email you have provided.'});
            }else{
                //  Compare password with hashed password.
                // console.log(user[0].password);
                const user = users[0];
                const result = await bcrypt.compare(password, user.password);
                if(result){
                    // create a jwt token
                    const token = jwt.sign(
                        {
                            userID: user.id,
                            email: user.email
                        },
                        process.env.SECRET,   // secret key
                        {
                            expiresIn:'1h'
                        }
                    );
                    // send the token 
                    res.status(200).json({message:'Logged IN',token:token});
                }else{
                    res.status(404).json({message: 'Inavlid Credentials. Please check the password you have provided.'});
                }
            }
        }catch (error){
            // console.log(error);
            res.status(500).json({message:'Something went wrong. Please try again'});
        }
}


// export the controller functions
export {createUser, loginUser};


/*
// controller function to create an admin
const createAdmin = async (req, res) => {
    const {userName,email,password} = req.body;
    // hash the user password for security purpose
    const hashedPassword = await bcrypt.hash(password,12);
    const user = {
        userName: userName,
        email: email,
        password: hashedPassword
    };
    try{
        const newUser = await signUp(user);
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

// controller function for admin to login
const loginAdmin = async (req,res)=>{
    try{
        const user = await findByEmail(req.body.email);
        if(!user){
            return res.status(400).send('Incorrect Credentials');
          }else{
            //  Compare password with hashed password.
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
       //  Create token.
       const token = jwt.sign(
        {
          userID: user._id,
          email: user.email,
        },
        process.env.SECRET,   // secret key
        {
          expiresIn: '2h',
        }
      );
      //  Send token.
      return res.status(200).send(token);
            }else{
              return res
              .status(400)
              .send('Incorrect Credentials');
            }
    }
          }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
}
*/