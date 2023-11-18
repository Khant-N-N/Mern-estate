import express from "express";
import { createlisting, deleteUserListings, getDetail, updateListing, getListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createlisting);
router.delete("/delete/:id", verifyToken, deleteUserListings);
router.get("/detail/:id", getDetail);
router.post("/update/:id", verifyToken, updateListing);
router.get("/getlist", getListings)

export default router;