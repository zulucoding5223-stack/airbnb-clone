import React from "react";
import { FaMedal } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import airbnbPolicy from "../../assets/airbnbPP.png";
import hostImage from "../../assets/host-image.avif";

const ListingHost = ({selectedLocation}) => {
  return (
    <div>
      <div className="mx-5 mt-5">
        <div className="flex gap-6 items-center">
          <img
            src={hostImage}
            alt="host-image"
            className="object-cover h-10 w-10 rounded-full"
          />
          <div className="flex items-start flex-col">
            <p className="font-bold">Hosted By {selectedLocation.hostName}</p>
            <p className="text-gray-500 text-xs">Joined in March 2025</p>
          </div>
        </div>
        <div className="text-xs flex items-center gap-5 mt-3">
          <span className="flex items-center gap-1">
            <IoStarSharp color="red" />
            {selectedLocation.ratings} Reviews
          </span>
          <span className="flex items-center gap-1">
            <RiVerifiedBadgeFill color="red" /> Identity verified
          </span>
          <span className="flex items-center gap-1">
            <FaMedal color="red" /> Identity verified
          </span>
        </div>
        <ul className="text-xs flex flex-col gap-4 mt-4">
          <li className="font-bold">{selectedLocation.hostName} is a super host</li>
          <li className="text-gray-500">
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </li>
          <li className="text-gray-500">Response rate: 100%</li>
          <li className="text-gray-500">Response time: within an hour</li>
        </ul>
        <button className="mt-10 mb-6 p-2 rounded w-fit text-xs border">
          Contact Host
        </button>
        <div className="flex items-center gap-3">
          <img src={airbnbPolicy} alt="" className="w-5 h-5 object-contain" />
          <p className="text-xs text-gray-500">
            To protect your money, never transfer money or communicate outside
            of the Airbnb website or app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingHost;
