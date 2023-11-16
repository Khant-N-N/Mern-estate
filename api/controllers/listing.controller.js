import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createlisting = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteUserListings = async (req, res, next) => {
    console.log(req)
    if (req.user.id !== req.params.id) return next(errorHandler(401, "Sign in First to delete listings"))
    try {
        await Listing.findByIdAndDelete()
    } catch (error) {
        next(error)
    }
}