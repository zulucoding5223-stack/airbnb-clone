import React from "react";
import { useLocation } from "react-router-dom";

const ReservationTable = ({
  deleteReservation,
  reservations,
  isLoading,
  user ,
}) => {
    const locationParam = useLocation();
  return (
    <div>
      {isLoading ? (
        <div>
          <h1 className="font-bold text-center text-2xl">Loading...</h1>
        </div>
      ) : (
        <div className={`${locationParam.pathname.startsWith('/admin') ? "mx-17": "mx-3"} my-10`}>
          <h1 className="font-bold text-center text-2xl">My Reservations</h1>
          {reservations.length === 0 ? (
            <div>
              <h2 className="text-center font-bold text-4xl mt-25">
                NO RESERVATIONS
              </h2>
            </div>
          ) : (
            <table className="mt-6 w-full">
              <thead>
                <tr className="bg-gray-300 text-xs border border-gray-400">
                  <th className="text-start px-2 py-1 border border-gray-400">
                    Booked by
                  </th>
                  <th className="text-start px-2 py-1 border border-gray-400">
                    Property name
                  </th>
                  <th className="text-start px-2 py-1 border border-gray-400">
                    Check-in Date
                  </th>
                  <th className="text-start px-2 py-1 border border-gray-400">
                    Check-out Date
                  </th>
                  <th className="text-start px-2 py-1 border border-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {reservations.map((reservation) => {
                  return (
                    <tr
                      key={reservation._id}
                      className="text-xs border border-gray-400"
                    >
                      <td className="p-2 text-start border border-gray-400">
                        {locationParam.pathname.startsWith('/admin') ? reservation.username : user?.username || 'Unknown'} 
                      </td>
                      <td className="p-2 text-start border border-gray-400">
                        {reservation.listingLocation}
                      </td>
                      <td className="p-2 text-start border border-gray-400">
                        {new Date(reservation.checkIn).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="p-2 text-start border border-gray-400">
                        {new Date(reservation.checkOut).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="p-2 text-center border border-gray-400">
                        <button
                          onClick={() => deleteReservation(reservation._id)}
                          className="bg-red-600 text-white py-1.5 w-full rounded hover:cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationTable;
