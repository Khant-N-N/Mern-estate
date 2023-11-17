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
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "listing not found!"))
    if (req.user.id !== listing.userRef) return next(errorHandler(401, "Sign in First to delete listings"))
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("List has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getDetail = async (req, res, next) => {
    const list = await Listing.findById(req.params.id);
    if (!list) return next(errorHandler(404, "listing not found!"))
    try {
        res.status(201).json(list);
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    const list = await Listing.findById(req.params.id);
    if (!list) return next(errorHandler(404, "listing not found!"))
    if (req.user.id !== list.userRef) return next(errorHandler(401, "Sign in first to update listing"))
    try {
        const updateList = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(updateList);
    } catch (error) {
        next(error)
    }
}