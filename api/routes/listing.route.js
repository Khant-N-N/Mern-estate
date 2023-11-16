import express from "express";
import { createlisting, deleteUserListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createlisting);
router.delete("/delete/:id", verifyToken, deleteUserListings)

export default router;