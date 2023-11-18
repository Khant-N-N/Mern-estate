import Listing from "../models/listing.model.js";
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

export const getListings = async (req, res, next) => {
    try {
        //query come from url (isting/getlist?limit=2&blah=blah)
        const limit = parseInt(req.query.limit) || 9 //u can add limit when req
        const startIndex = parseInt(req.query.startIndex) || 0

        let offer = req.query.offer;
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] } // $in is (search inside a database) with all false and true values
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === "false") furnished = { $in: [false, true] }

        let parking = req.query.parking;
        if (parking === undefined || parking === "false") parking = { $in: [false, true] }

        let type = req.query.type;

        if (type === undefined || type === "all") type = { $in: ['sale', 'rent'] }

        const searchTerm = req.query.searchTerm || "";

        const sort = req.query.sort || "createdAt";

        const order = req.query.sort || "desc";

        const getListing = await Listing.find({
            //option is for not care about upper/lower cases
            name: { $regex: searchTerm, $options: "i" }, //regex is for building search functional for mongodb(can be search with some letter part of words)
            offer,
            parking,
            furnished,
            type,
        }).sort({
            [sort]: order
        }).limit(limit).skip(startIndex);

        return res.status(200).json(getListing);


    } catch (error) {
        next(error)
    }
}