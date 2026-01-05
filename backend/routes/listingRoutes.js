import express from "express";
import { upload } from "../config/multer.js";
import { createListing, deleteListing, getHostListings, getListing, getListings, updateListing } from "../controllers/listingController.js";
import { auth } from "../middleware/auth.js";
import { validAccess } from "../middleware/access.js";

const listingRouter = express.Router();

listingRouter.post("/create-listing", upload.array('images', 5), auth, validAccess('host'), createListing);
listingRouter.get("/view-listings", getListings);
listingRouter.get("/view-host-listings", auth, validAccess('host'), getHostListings);
listingRouter.get("/view-host-listing/:id", auth, validAccess('host'), getListing);
listingRouter.delete("/delete-listing/:id", auth, validAccess('host'), deleteListing);
listingRouter.put('/update-listing/:id', upload.array('images', 5), auth, validAccess('host'), updateListing);
export default listingRouter;
