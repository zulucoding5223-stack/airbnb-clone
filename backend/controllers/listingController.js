import listingModel from "../models/listingSchema.js";
import userModel from "../models/userSchema.js";

/* ================= CREATE LISTING ================= */
export const createListing = async (req, res) => {
  try {
    const hostId = req.user.id;

    const host = await userModel.findById(hostId);
    if (!host) {
      return res.status(404).json({
        success: false,
        message: "Host not found.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image.",
      });
    }

    const {
      title,
      location,
      country,
      description,
      type,
      guests,
      bedrooms,
      bathrooms,
      cleaningFee,
      serviceFee,
      occupancyFee,
      weeklyDiscount,
      price,
      amenities,
      enhancedCleaning,
      selfCheckIn,
    } = req.body;

    if (
      !title ||
      !location ||
      !country ||
      !description ||
      !type ||
      !guests ||
      !bedrooms ||
      !bathrooms ||
      !cleaningFee ||
      !serviceFee ||
      !occupancyFee ||
      !weeklyDiscount ||
      !price
    ) {
      return res.status(403).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    let parsedAmenities = [];
    try {
      parsedAmenities = JSON.parse(amenities || "[]");
    } catch {
      parsedAmenities = [];
    }

    if (!parsedAmenities.length) {
      return res.status(400).json({
        success: false,
        message: "Please add at least one amenity.",
      });
    }

    const imagePaths = req.files.map((file) => file.filename);

    const newListing = await listingModel.create({
      host: host._id,
      hostName: host.username,
      title,
      location,
      country,
      description,
      type,
      guests,
      bedrooms,
      bathrooms,
      cleaningFee,
      serviceFee,
      occupancyFee,
      weeklyDiscount,
      price,
      ratings: 4.5,
      reviews: 320,
      amenities: parsedAmenities,
      images: imagePaths,
      enhancedCleaning: enhancedCleaning === "true",
      selfCheckIn: selfCheckIn === "true",
    });

    return res.status(201).json({
      success: true,
      listing: newListing,
      message: "Listing successfully created.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during listing creation.",
    });
  }
};

/* ================= GET ALL LISTINGS ================= */
export const getListings = async (req, res) => {
  try {
    const listings = await listingModel.find();

    return res.status(200).json({
      success: true,
      listings,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error when retrieving listings.",
    });
  }
};

/* ================= UPDATE LISTING ================= */
export const updateListing = async (req, res) => {
  try {
    const hostId = req.user.id;
    const listingId = req.params.id;

    const listing = await listingModel.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    if (String(listing.host) !== hostId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this listing.",
      });
    }

    let updateData = {};

    for (const key in req.body) {
      if (!["amenities", "images"].includes(key)) {
        updateData[key] = req.body[key];
      }
    }

    if (req.body.amenities !== undefined) {
      if (req.body.amenities === "") {
        updateData.amenities = [];
      } else {
        try {
          updateData.amenities = JSON.parse(req.body.amenities);
        } catch {
          updateData.amenities = req.body.amenities
            .split(",")
            .map((a) => a.trim());
        }
      }
    }

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    await listingModel.updateOne({ _id: listingId }, { $set: updateData });

    const updatedListing = await listingModel.findById(listingId);

    return res.status(200).json({
      success: true,
      updatedListing,
      message: "Listing updated successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during listing update.",
    });
  }
};

/* ================= GET SINGLE LISTING ================= */
export const getListing = async (req, res) => {
  try {
    const listing = await listingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    return res.status(200).json({
      success: true,
      listing,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error when fetching listing.",
    });
  }
};

/* ================= DELETE LISTING ================= */
export const deleteListing = async (req, res) => {
  try {
    const hostId = req.user.id;
    const listingId = req.params.id;

    const listing = await listingModel.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    if (String(listing.host) !== hostId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this listing.",
      });
    }

    await listingModel.findByIdAndDelete(listingId);

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully.",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error when deleting listing.",
    });
  }
};
