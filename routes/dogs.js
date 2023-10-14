import express from "express";
import Dog from "../models/Dog.js";

const dogsRouter = express.Router()

//create a new dog
dogsRouter.post("/", async (req, res) => {
    try {
        const {breedName, dogImg, dogAbout, sportNeed, affectionateLevel} = req.body;
        const response = await Dog.create({breedName, dogImg, dogAbout, sportNeed, affectionateLevel})
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get all dogs
dogsRouter.get("/", async (req,res) => {
    try {
        const response = await Dog.find()
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get a dog by breed name
dogsRouter.get("/name/:breedName", async (req, res) => {
    const {breedName} = req.params

    try {
      const response = await Dog.find({breedName: breedName});
      res.json(response)    } 

catch(err){
        res.status(500).json(err)
    }
})


//get a dog by id
dogsRouter.get("/id/:id", async (req,res) => {
    try {
        const {id} = req.params
        // console.log(breedName)
        const response = await Dog.findById({_id: id})
        // console.log(response)

        if(!id){
            return res.status(404).json({message: "Dog not found"})
        }

        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

//edit a dog
dogsRouter.put("/:breedName", async (req, res) => {
    try {
        const {breedName} = req.params
        const {newName, newImg, newAbout, newSport, newAffection} = req.body
        const response = await Dog.findOneAndUpdate({breedName}, {$set: {breedName: newName, dogImg: newImg, dogAbout: newAbout, sportNeed: newSport, affectionateLevel: newAffection}}, {new: true})
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete a dog
dogsRouter.delete("/:breedName", async (req, res) => {
    try {
        const {breedName} = req.params
        const response = await Dog.deleteOne(breedName)

        if(!result){
            res.status(404).json({message: "Dog not found"})
        }
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


export default dogsRouter