import express from "express"
import "dotenv/config"
import client from "./db/db.js"

const app = express()

app.use(express.json())

const port = 3000 || process.env.port



client.on("connected", () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})

