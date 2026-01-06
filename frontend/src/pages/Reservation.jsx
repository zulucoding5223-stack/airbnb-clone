import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/AppContextProvider";
import api from "../utils/axios";
import ReservationTable from "../components/ReservationTable";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const { isLoading, setIsLoading, user } = useContext(AppContext);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get("/reservations/get-reservations");
        setReservations(response.data.reservations);
        setIsLoading(false);
      } catch (error) {
        const message =
          error.response?.data?.message || "Error fetching reservations.";
        alert(message);
      }
    };

    fetchListings();
  }, []);

  const deleteReservation = async (reservationId) => {
    try {
      await api.delete(`/reservations/delete-reservation/${reservationId}`);
    const newReservations = reservations.filter(
      (reservation) => reservation._id !== reservationId
    );
    setReservations(newReservations);
    } catch (error) {
      const message = error.response?.data?.message || 'Error when deleting listings.';
      alert(message);
    }
    
  };
  return (
    <ReservationTable
      deleteReservation={deleteReservation}
      isLoading={isLoading}
      user={user}
      reservations={reservations}
    />
  );
};

export default Reservation;
