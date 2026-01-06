import listingModel from "../models/listingSchema.js";
import reservationModel from "../models/reservationSchema.js";
import userModel from "../models/userSchema.js";

/* ================= CREATE RESERVATION ================= */
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

    const { listingId, checkIn, checkOut } = req.body;

    const listing = await listingModel.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found.",
      });
    }

    if (!checkIn || !checkOut) {
      return res.status(403).json({
        success: false,
        message: "Check-in and check-out dates are required.",
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

    return res.status(201).json({
      success: true,
      reservation: newReservation,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error when creating a reservation.",
    });
  }
};

/* ================= USER RESERVATIONS ================= */
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
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error when fetching your reservations.",
    });
  }
};

/* ================= HOST CLIENT RESERVATIONS ================= */
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

    const clientsReservations = await reservationModel.find({
      host: hostId,
    });

    return res.status(200).json({
      success: true,
      clientsReservations,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error when loading clients reservations.",
    });
  }
};

/* ================= DELETE USER RESERVATION ================= */
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

    const reservation = await reservationModel.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    if (String(reservation.user) !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this reservation.",
      });
    }

    await reservationModel.findByIdAndDelete(reservationId);

    return res.status(200).json({
      success: true,
      message: "Reservation successfully deleted.",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error when deleting your reservation.",
    });
  }
};

/* ================= DELETE CLIENT RESERVATION (HOST) ================= */
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

    const reservation = await reservationModel.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    if (String(reservation.host) !== hostId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this reservation.",
      });
    }

    await reservationModel.findByIdAndDelete(reservationId);

    return res.status(200).json({
      success: true,
      message: "Reservation successfully deleted.",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error when deleting reservation.",
    });
  }
};
