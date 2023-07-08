import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import UserRoute from "./routes/userRoute.js"

const app = express()
mongoose.connect('mongodb+srv://vieryfirdaus2527:BwpJOzYx8qAQ5S4b@gemastik.jy52zqv.mongodb.net/gemastik')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
    console.log("Connected to DB")
})

app.use(cors())
app.use(express.json())
app.use(UserRoute)

app.listen(5000, () => console.log("Server Running"))
