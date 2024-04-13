import expres from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const app = expres()

mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((err) => {
        console.log(err);
    })


app.listen(300, () => {
    console.log("Server is running at port 300");
})