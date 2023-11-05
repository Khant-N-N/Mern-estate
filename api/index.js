import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to mongodb")
}).catch((err) => {
    console.log("error connecting mongodb", err)
})

app.use(express.json()); // by default json is not allow to the server, so allow json as input
app.listen(3001, () => {
    console.log("Server is started")
})
app.use("/api/user", userRouter)

app.use("/api/auth", authRouter)