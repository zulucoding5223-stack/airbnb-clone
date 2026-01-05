import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/AppContextProvider";
import api from "../utils/axios";
import ReservationTable from "../components/ReservationTable";
import Navbar from '../components/Navbar'
import AdminNavLinks from '../components/AdminNavLinks'

const UserReservations = () => {
    const [reservations, setReservations] = useState([]);
  const { isLoading, setIsLoading, user } = useContext(AppContext);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get("/reservations/clients-reservations");
        setReservations(response.data.clientsReservations);
        console.log("reservations 1: ",response.data.clientsReservations)
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
        await api.delete(`/reservations/delete-client-reservation/${reservationId}`);
    const newReservations = reservations.filter(
      (reservation) => reservation._id !== reservationId
    );
    setReservations(newReservations);
    } catch (error) {
        
    }
}

console.log("reservations 2: ",reservations)
  return (
    <div className="pt-2.5">
        <Navbar />
        <div className='mx-17'>
            <AdminNavLinks />
        </div>

        <ReservationTable
              deleteReservation={deleteReservation}
              isLoading={isLoading}
              user={user}
              reservations={reservations}
        />
        
    </div>
  )
}

export default UserReservations