import listingModel from "../models/listingSchema.js";
import userModel from "../models/userSchema.js";

export const createListing = async (req, res) => {
  try {
    const hostId = req.user.id;
    const host = await userModel.findById(hostId);

    if (!host) {
      return res
        .status(404)
        .json({ success: false, message: "Host not found." });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images added. Please upload at least 1 image.",
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
        message: "Please fill in empty fields.",
      });
    }

    const parsedAmenities = JSON.parse(amenities || "[]");

    if (parsedAmenities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please add at least one amenity.",
      });
    }

    const images = req.files;
    const imagePaths = images.map((file) => file.filename);

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
      amenities: parsedAmenities,
      images: imagePaths,
      enhancedCleaning: enhancedCleaning === "true",
      selfCheckIn: selfCheckIn === "true",
    });

    return res.status(201).json({ success: true, listings: newListing, message: 'Listing successfully created.' });
  } catch (error) {
    console.error("Create Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during listing creation.",
    });
  }
};

export const getListings = async (req, res) => {
  try {
    const listings = await listingModel.find();
    console.log(listings);
    return res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      sucess: false,
      message: "Internal server error when retrieving listings.",
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const hostId = req.user.id;
    const listingId = req.params.id;

    const listing = await listingModel.findById(listingId);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found." });
    }

    if (String(listing.host) !== hostId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. You cannot update another user's listing.",
      });
    }

    let updateData = {};

    for (const key in req.body) {
      if (!["reviews", "amenities", "images"].includes(key)) {
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

    if (req.body.reviews !== undefined) {
      if (req.body.reviews === "") {
        updateData.reviews = [];
      } else {
        try {
          updateData.reviews = JSON.parse(req.body.reviews);
        } catch {
          updateData.reviews = req.body.reviews.split(",").map((a) => a.trim());
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
      message: 'Listing updated successfully.'
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during listing update.",
    });
  }
};

export const getHostListings = async (req, res) => {
  try {
    const hostId = req.user.id;
    const host = await userModel.findById(hostId);
    if (!host) {
      return res.status(403).json({
        success: false,
        message: "Host not found. Please log in.",
      });
    }

    const listings = await listingModel.find({ host: hostId });

    if (!listings) {
      return res.status(403).json({
        success: false,
        message: "Listings not found.",
      });
    }

    return res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      sucess: false,
      message: "Internal server error when fetching host listings.",
    });
  }
};

export const getListing = async (req, res) => {
  try {
    const hostId = req.user.id;
    const host = await userModel.findById(hostId);
    const listingId = req.params.id;
    if (!host) {
      return res.status(403).json({
        success: false,
        message: "Host not found. Please log in.",
      });
    }

    const listing = await listingModel.findById(listingId);

    if (!listing) {
      return res.status(403).json({
        success: false,
        message: "Listing not found.",
      });
    }

    return res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      sucess: false,
      message: "Internal server error when fetching host listings.",
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const hostId = req.user.id;
    const listingId = req.params.id;
    const host = await userModel.findById(hostId);
    if (!host) {
      return res.status(404).json({
        success: false,
        message: "Host not found.",
      });
    }

    await listingModel.findOneAndDelete({ _id: listingId });
    return res.status(200).json({
      success: true,
      message: "Listing deleted.",
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      sucess: false,
      message: "Internal server error when deleting a listing.",
    });
  }
};
