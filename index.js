import express from "express"

const app = express()

const port = 3000 || process.env.port


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

