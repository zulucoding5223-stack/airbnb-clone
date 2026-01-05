import React, { useState } from "react";
import Calendar from "react-calendar";
import { SlCalender } from "react-icons/sl";

const ListingCalenders = ({ selectedLocation }) => {
  const [displayCheckIn, setDisplayCheckIn] = useState(new Date());
  const [displayCheckOut, setDisplayCheckOut] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const formattedCheckInDate = `${String(displayCheckIn.getDate()).padStart(
    2,
    "0"
  )}/${String(displayCheckIn.getMonth() + 1).padStart(
    2,
    "0"
  )}/${displayCheckIn.getFullYear()}`;

  const formattedCheckOutDate = `${String(displayCheckOut.getDate()).padStart(
    2,
    "0"
  )}/${String(displayCheckOut.getMonth() + 1).padStart(
    2,
    "0"
  )}/${displayCheckOut.getFullYear()}`;
  return (
    <div>
      <h2 className="font-bold text-xl text-gray-500 pb-8">
        7 nights in {selectedLocation.location}
      </h2>
      <div className="text-xs text-gray-500">
        <span>{formattedCheckInDate}</span> -{" "}
        <span>{formattedCheckOutDate}</span>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="flex items-center flex-col">
          <span className="text-xs">Check-in</span>
          <Calendar
            onChange={setDisplayCheckIn}
            value={displayCheckIn}
            minDate={new Date()}
            minDetail="month"
            maxDetail="month"
            view="month"
          />
        </div>
        <div className="flex items-center flex-col">
          <span className="text-xs">Check-out</span>
          <Calendar
            onChange={setDisplayCheckOut}
            value={displayCheckOut}
            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          />
        </div>
      </div>
      <div className="text-xs flex items-center gap-92 mt-5">
        <SlCalender />
        <span className="text-blue-800 underline">Clear dates</span>
      </div>
    </div>
  );
};

export default ListingCalenders;
