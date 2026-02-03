import "dotenv/config"
import express from "express"
const app = express()


app.get("/", (req, res) => {

    res.json("Hello World")
})


app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))