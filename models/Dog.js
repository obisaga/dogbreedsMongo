import mongoose from "mongoose";

const DogSchema = new mongoose.Schema({
    breedName: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 250,
        trim: true
    },  
    dogImg: {
        type: String
    },
    
    dogAbout: {
        type: String,
        required: true,
        minlength: 1
    },
    sportNeed: {
        type: Number,
        required: true
    },
    affectionateLevel: {
        type: Number,
        required: true
    }
    
})

const Dog = mongoose.model("Dog", DogSchema)

export default Dog