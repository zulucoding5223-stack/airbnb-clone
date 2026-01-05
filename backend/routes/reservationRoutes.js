import express from 'express';
import { validAccess } from '../middleware/access.js';
import { auth } from '../middleware/auth.js';
import { createReservation, deleteUserReservation, getClientsReservations, getUserReservations, deleteClientsReservation } from '../controllers/reservationController.js';
const reservationRouter = express.Router();

reservationRouter.post('/create-reservation', auth, validAccess('user'), createReservation);
reservationRouter.get('/get-reservations', auth, validAccess('user'), getUserReservations);
reservationRouter.get('/clients-reservations', auth, validAccess('host'), getClientsReservations);
reservationRouter.delete('/delete-reservation/:reservationId', auth, validAccess('user'), deleteUserReservation);
reservationRouter.delete('/delete-client-reservation/:reservationId', auth, validAccess('host'), deleteClientsReservation);

export default reservationRouter;


