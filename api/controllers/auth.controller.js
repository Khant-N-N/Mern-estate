import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("User created successfully")
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'Email not found!'));
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: passs, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }) //no other thirdparty can access the cookie
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    const { username, email, photo } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: passs, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        } else {
            const generatePassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatePassword, 10);
            const newUser = new User({ username, email, password: hashedPassword, avatar: photo })
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: passs, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        }
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(201).json("User signout successfully")
    } catch (error) {
        next(error)
    }
}
