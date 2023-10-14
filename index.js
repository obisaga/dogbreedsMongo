import express from "express"
import "dotenv/config"
import client from "./db/db.js"
import dogsRouter from "./routes/dogs.js"

const app = express()

app.use(express.json())

app.use("/api/dogs", dogsRouter)

const port = 3000 || process.env.port



client.on("connected", () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})

