import express from "express";
import Dog from "../models/Dog.js";

const dogsRouter = express.Router()


//error handling
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const statusMessage = err.message || "Internal server error";
    res.status(statusCode).json({error: statusMessage})
}

// dogsRouter.use(errorHandler)


//create a new dog
dogsRouter.post("/", async (req, res, next) => {
    try {
        const {breedName, dogImg, dogAbout, sportNeed, affectionateLevel} = req.body;
        const response = await Dog.create({breedName, dogImg, dogAbout, sportNeed, affectionateLevel})
        res.status(201).json(response) 
        
    } catch (error) {
        res.status(401).json({message: "Invalid entry"})
        next()
    }
}, errorHandler)


//get all dogs
dogsRouter.get("/", async (req, res, next) => {
    try {
        const response = await Dog.find()
        res.status(200).json(response)
    } catch (error) {
        next()
    }
}, errorHandler)


//get a dog by breed name
dogsRouter.get("/name/:breedName", async (req, res, next) => {
    try {
      const {breedName} = req.params
      const response = await Dog.findOne({breedName: breedName});
      
      if (!response) {
        res.status(404).json({message: `Dog with a name ${breedName} doesn't exist`}) //checks if the dog breed is the database
    } else {
        res.status(200).json(response)    
    }
      
    } catch(err) {
       next()
    }
}, errorHandler)


//get a dog by id
dogsRouter.get("/id/:id", async (req,res, next) => {
    try {
        const {id} = req.params
        const response = await Dog.findById({_id: id})

        if(!id){
            return res.status(404).json({message: `Dog with id ${id} doesn't exist`})
        }

        res.status(201).json(response)
    } catch (error) {
        next()
    }
}, errorHandler)


//edit a dog
dogsRouter.put("/:breedName", async (req, res) => {
    try {
        const {breedName} = req.params
        const {newName, newImg, newAbout, newSport, newAffection} = req.body
        const response = await Dog.findOneAndUpdate({breedName}, {$set: {breedName: newName, dogImg: newImg, dogAbout: newAbout, sportNeed: newSport, affectionateLevel: newAffection}}, {new: true})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete a dog
dogsRouter.delete("/:breedName", async (req, res) => {
    try {
        const {breedName} = req.params
        const response = await Dog.deleteOne({breedName : breedName})

        if(!response){
            res.status(404).json({message: "Dog not found"})
        }
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


export default dogsRouter
