import express from "express"
import "dotenv/config"
import client from "./db/db.js"
import dogsRouter from "./routes/dogs.js"
import authRouter from "./routes/auth.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
    credentials: true,
  }))

app.use("/api/dogs", dogsRouter)
app.use("/api/auth", authRouter)

const port = 3000 || process.env.port



client.on("connected", () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
    app.listen(80, function () {
        console.log('CORS-enabled web server listening on port 80')
      })
})

