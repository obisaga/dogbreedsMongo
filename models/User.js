import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 250,
        trim: true
    },  
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 250,
        trim: true
    }, 
    email: {
        type: String,
        required: [true, "Email required"],
        minlength: 1,
        maxlength: 100,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
    
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

export default User