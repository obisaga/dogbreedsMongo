import express from "express"
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const authRouter = express.Router();


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
        const {username, password, email} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).send('Invalid credentials');
        }
        //Compare passwords
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).send('Invalid credentials');
        }
        const token = generateToken({username: user.username});
        console.log(token)
        
        if(!token){
            res.redirect("/register")
            }

        res.set("token", token)
        res.set("Access-Control-Expose-Headers", "token");
        
    } catch (error) {
        res.status(401).json({message: "Invalid entry"})
    }
});



      






export default authRouter;