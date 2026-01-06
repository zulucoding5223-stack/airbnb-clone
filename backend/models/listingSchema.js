import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hostName: { type: String },
  location: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  ratings: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 320 },
  price: { type: Number, required: true },
  weeklyDiscount: { type: Number, required: true },
  serviceFee: { type: Number, required: true },
  cleaningFee: { type: Number, required: true },
  occupancyFee: { type: Number, required: true },
  amenities: { type: Array, required: true },
  images: { type: Array, required: true },
  enhancedCleaning: {type: Boolean, default:  true},
  selfCheckIn : {type: Boolean, default:true},
});

const listingModel =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default listingModel;
