import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to mongodb")
}).catch((err) => {
    console.log("error connecting mongodb", err)
})

app.use(cookieParser());

app.use(express.json()); // by default json is not allow to the server, so allow json as input
app.listen(3001, () => {
    console.log("Server is started")
})
app.use("/api/user", userRouter)

app.use("/api/auth", authRouter)

app.use("/api/listing", listRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})