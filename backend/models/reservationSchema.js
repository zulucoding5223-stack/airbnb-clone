import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    listingLocation: {
        type:String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    }
})

const reservationModel = mongoose.models.Reservation || mongoose.model('reservation', reservationSchema);
export default reservationModel;