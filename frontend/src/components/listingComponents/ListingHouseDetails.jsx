import React, { useContext } from "react";
import { BsHouseDoor, BsStars } from "react-icons/bs";
import { MdOutlineDoorFront } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { AppContext } from "../../utils/AppContextProvider";
import hostImage from "../../assets/host-image.avif";

const ListingHouseDetails = ({ selectedLocation }) => {
  const { user } = useContext(AppContext);
  return (
    <div className="h-100">
      <div>
        <div className="relative">
          <h2 className="text-md font-bold pb-1">
            {selectedLocation.type} hosted by {selectedLocation.hostName}
          </h2>
          <p className="text-xs text-gray-500">
            {selectedLocation.guests} guests - {selectedLocation.type} -{" "}
            {selectedLocation.bedrooms} bedrooms - {selectedLocation.bathrooms}{" "}
            bathrooms
          </p>
          <img
            src={hostImage}
            alt="host-image"
            className="object-cover h-12 w-12 rounded-full absolute z-10 top-0 left-138"
          />
        </div>
        <div>
          <div className="mt-11">
            <div className="flex items-center gap-2 text-sm font-bold">
              <BsHouseDoor size="1.5em" />
              <p>{selectedLocation.type}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 ml-7.5">
              You'll have the {selectedLocation.type.toLowerCase()} for yourself
            </p>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 text-sm font-bold">
              <BsStars size="1.5em" />
              <p>
                {selectedLocation.enhancedCleaning
                  ? "Enhanced Cleaning"
                  : "No Enhanced Cleaning"}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 ml-7.5">
              This Host committed to Airbnb's 5-step enhanced cleaning process.
            </p>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 text-sm font-bold">
              <MdOutlineDoorFront size="1.5em" />
              <p>
                {selectedLocation.selfCheckIn
                  ? "Self Check-in:"
                  : "No Self Check-in"}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 ml-7.5">
              Check yourself in with the keypad
            </p>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 text-sm font-bold">
              <SlCalender size="1.5em" />
              <p>Free cancellation before 14 Feb</p>
            </div>
          </div>
        </div>
        <hr className=" bg-gray-500 w-160 my-8"></hr>
        <div className="w-160 text-xs text-gray-500 h-20">
          {selectedLocation.description}
        </div>
      </div>
    </div>
  );
};

export default ListingHouseDetails;
