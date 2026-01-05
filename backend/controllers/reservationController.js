import listingModel from "../models/listingSchema.js";
import reservationModel from "../models/reservationSchema.js";
import userModel from "../models/userSchema.js";

export const createReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please login.",
      });
    }

    const {listingId} = req.body;
    const listing = await listingModel.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    const { checkIn, checkOut } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(403).json({
        success: false,
        message: "No checkIn and checkOut dates.",
      });
    }

    const newReservation = await reservationModel.create({
      user: user._id,
      username: user.username,
      listing: listing._id,
      listingLocation: listing.location,
      host: listing.host,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    });

    await newReservation.save();

    return res.status(201).json({
      success: true,
      newReservation,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error when creating a reservation.",
    });
  }
};

export const getUserReservations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please login.",
      });
    }

    const reservations = await reservationModel.find({ user: userId });

    return res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error when fetching your reservations.",
    });
  }
};

export const getClientsReservations = async (req, res) => {
  try {
    const hostId = req.user.id;
    const host = await userModel.findById(hostId);
    if (!host) {
      return res.status(404).json({
        success: false,
        message: "Host not found. Please login.",
      });
    }

    const clientsReservations = await reservationModel.find({ host: hostId });

    return res.status(200).json({
      success: true,
      clientsReservations,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error when loading clients reservations.",
    });
  }
};
export const deleteUserReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please login.",
      });
    }

    const { reservationId } = req.params;

    await reservationModel.findByIdAndDelete(reservationId);

    return res.status(200).json({
      success: true,
      message: "reservation successfully deleted.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error when deleting your reservation.",
    });
  }
};

export const deleteClientsReservation = async (req, res) => {
  try {
    const hostId = req.user.id;
    const host = await userModel.findById(hostId);
    if (!host) {
      return res.status(404).json({
        success: false,
        message: "Host not found. Please login.",
      });
    }

    const { reservationId } = req.params;

    await reservationModel.findByIdAndDelete(reservationId);

    return res.status(200).json({
      success: true,
      message: "reservation successfully deleted.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error when deleting your reservation.",
    });
  }
};