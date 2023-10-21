import express from "express"
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const authRouter = express.Router();

// const secret = process.env.SECRET;


const generateToken = (data) => {
    return jwt.sign(data, secret, {expiresIn: '1800s'})
  }
  

authRouter.post("/register", async (req, res) => {
    try {
        const {username, password, email} = req.body;
        //  Hash the password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await User.create({username, password:hashedPassword, email})
        res.status(201).json(response) 
        
    } catch (error) {
        res.status(401).json({message: "Invalid entry"})
    }
});


authRouter.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        const {username, password} = req.body;
        //check if the user exists in db
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }
        //Compare passwords
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({message: "Invalid credentials"});
        }
        res.json({message: "Success"}) 
    } catch (error) {
        res.status(401).json({message: "Invalid credentials"})
    }
});

export default authRouter;