import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { IoStarSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AppContext } from "../../utils/AppContextProvider";
import api from "../../utils/axios";

const ListingCalculator = ({ selectedLocation }) => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [totalNights, setTotalNights] = useState(0);
  const [baseTotal, setBaseTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const guestsNumbers = [1, 2, 3, 4, 5, 6];
  const { user } = useContext(AppContext);

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diffTime = end.getTime() - start.getTime();
    const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  };

  const calculateBaseTotal = (totalNights, pricePerNight) => {
    const baseT = totalNights * pricePerNight;
    return baseT;
  };

  const calculateGrandTotal = (
    baseTotal,
    weeklyDiscount,
    cleaningFee,
    serviceFee,
    occupancyTaxes,
    checkIn,
    checkOut
  ) => {
    let total = baseTotal + cleaningFee + serviceFee + occupancyTaxes;
    let startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    while (startDate < endDate) {
      if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        total = total - weeklyDiscount;
      }

      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }

    return total;
  };

  useEffect(() => {
    const nights = calculateNights(checkIn, checkOut);
    setTotalNights(nights);

    const nightsTotal =
      calculateBaseTotal(nights, Number(selectedLocation.price)) === 0
        ? 0
        : guests * calculateBaseTotal(nights, Number(selectedLocation.price));
    setBaseTotal(nightsTotal);

    const grandT = calculateGrandTotal(
      nightsTotal,
      Number(selectedLocation.weeklyDiscount),
      Number(selectedLocation.cleaningFee),
      Number(selectedLocation.serviceFee),
      Number(selectedLocation.occupancyFee),
      checkIn,
      checkOut
    );
    setGrandTotal(grandT);
  }, [checkIn, checkOut, baseTotal, guests]);
  console.log(selectedLocation._id);

  const createReservation = async () => {
    try {
      const response = await api.post("/reservations/create-reservation", {
        checkIn,
        checkOut,
        listingId: selectedLocation._id,
      });
      console.log(response);

      alert("Reservation successfully created.");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="px-3 py-2.5 border w-75 h-fit border-gray-400 rounded-lg shadow mt-1.5">
        <div className="flex justify-between">
          <p className="text-sm font-bold">
            <span>${selectedLocation.price}</span>
            <span className="mx-1">/</span>
            <span>night</span>
          </p>
          <p className="text-sm text-gray-500 flex items-center">
            <span>
              <IoStarSharp />
            </span>
            <span className="mx-1">{selectedLocation.ratings}</span>
            <span>({selectedLocation.reviews.length})</span>
          </p>
        </div>
        <div className="w-full border border-gray-400 rounded-lg mt-2.5">
          <div className="p-1">
            <div className="flex items-center justify-around font-bold text-sm">
              <span>CHECK-IN</span>
              <span>CHECK-OUT</span>
            </div>
            <div className="flex items-center justify-between gap-1 mt-1 mx-1">
              <DatePicker
                selected={checkIn}
                onChange={(date) => {
                  setCheckIn(date);
                }}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                customInput={
                  <input
                    id="check-in"
                    className="w-full text-xs border-none outline-gray-300 text-center text-gray-500 hover:cursor-pointer"
                  />
                }
                dateFormat="dd/MM/yyyy"
                placeholderText="Add date"
                minDate={new Date()}
              />
              <DatePicker
                selected={checkOut}
                onChange={(date) => {
                  setCheckOut(date);
                }}
                selectsEnd
                startDate={checkIn}
                endDate={checkOut}
                minDate={
                  new Date(new Date(checkIn).setDate(checkIn.getDate() + 1))
                }
                customInput={
                  <input
                    id="check-out"
                    className="w-full text-xs border-none outline-gray-300 text-center text-gray-500 hover:cursor-pointer"
                  />
                }
                dateFormat="dd/MM/yyyy"
                placeholderText="Add date"
              />
            </div>
          </div>
          <hr className="w-full text-gray-400 my-1" />
          <div className="p-1">
            <div>
              <span className="font-bold text-sm pl-1">Guests</span>
            </div>
            <div className="relative w-full pb-2">
              <input
                type="text"
                readOnly
                value={
                  String(guests) + `${guests === 1 ? " guest" : " guests"}`
                }
                className="w-full text-xs text-gray-400 px-1 outline-gray-400 hover:cursor-pointer"
                onClick={() => setIsClicked((prev) => !prev)}
              />
              <ul
                className={`absolute top-5.5 -left-0.5 w-full p-1 text-xs text-gray-400 z-20 bg-white border border-gray-400 ${
                  isClicked ? "block" : "hidden"
                } hover:cursor-pointer`}
              >
                {guestsNumbers.map((guestNumber, index) => {
                  return (
                    <li
                      key={index}
                      className="pt-0.5 pb-1 px-1 hover:bg-blue-400 hover:text-white"
                      onClick={() => {
                        setGuests(guestNumber);
                        setIsClicked(false);
                      }}
                    >
                      {guestNumber} {guestNumber === 1 ? "guest" : "guests"}
                    </li>
                  );
                })}
              </ul>
              <RiArrowDropDownLine
                className="text-gray-400 absolute -top-0.5 left-60 hover:cursor-pointer"
                size="2em"
                onClick={() => setIsClicked((prev) => !prev)}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => createReservation()}
          className="w-full text-center mt-2.5 py-2 rounded-lg bg-red-400 text-white hover:cursor-pointer"
        >
          Reserve
        </button>
        <div className="text-gray-500 text-center text-xs mt-2.5 mb-3.5">
          <span>You won't be charged yet</span>
        </div>
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span>
              ${selectedLocation.price} x {totalNights}
            </span>
            <span className="w-fit">${baseTotal}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span>Weekly Discount</span>
            <span className="w-fit">-${selectedLocation.weeklyDiscount}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span>Cleaning fee</span>
            <span className="w-fit">${selectedLocation.cleaningFee}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span>Service fee</span>
            <span className="w-fit">${selectedLocation.serviceFee}</span>
          </div>
          <div className="mt-1 mb-1 flex items-center justify-between">
            <span>Occupancy taxes and fees</span>
            <span className="w-fit">${selectedLocation.occupancyFee}</span>
          </div>
        </div>
        <hr className="text-gray-400 mt-2 mb-4" />
        <div className="flex items-center justify-between text-sm font-bold">
          <span>Total</span>
          <span>${grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCalculator;
