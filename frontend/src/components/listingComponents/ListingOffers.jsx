import React from "react";
import { BsCameraVideo } from "react-icons/bs";
import { GoFlame } from "react-icons/go";
import { IoWifiOutline } from "react-icons/io5";
import { LiaBicycleSolid } from "react-icons/lia";
import { PiBone, PiLeaf } from "react-icons/pi";
import { RiHome6Line } from "react-icons/ri";
import { SiTarget } from "react-icons/si";
import { TbAirConditioning, TbFridge } from "react-icons/tb";

const ListingOffers = () => {
  return (
    <div>
      <div>
        <h2 className="font-bold text-xl text-gray-500 pb-6">
          What this place offers
        </h2>
        <div className="flex items-center gap-45 text-gray-500">
          <ul>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <PiLeaf className="text-black" size="1.2rem" />{" "}
              <span>Garden View</span>
            </li>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <SiTarget className="text-black" size="1.2rem" />{" "}
              <span>Free washer - in building</span>
            </li>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <RiHome6Line className="text-black" size="1.2rem" />{" "}
              <span>Refrigerator</span>
            </li>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <PiBone className="text-black" size="1.2rem" />{" "}
              <span>Pets allowed</span>
            </li>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <BsCameraVideo className="text-black" size="1.2rem" />{" "}
              <span>Security cameras</span>
            </li>
          </ul>
          <ul>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <IoWifiOutline className="text-black" size="1.2rem" />{" "}
              <span>Wifi</span>
            </li>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <TbAirConditioning className="text-black" size="1.2rem" />{" "}
              <span>Central air conditioning</span>
            </li>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <TbFridge className="text-black" size="1.2rem" />{" "}
              <span>Kitchen</span>
            </li>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <GoFlame className="text-black" size="1.2rem" />{" "}
              <span>Dryer</span>
            </li>
            <li className="w-fit gap-2 flex items-center text-xs pb-3">
              <LiaBicycleSolid className="text-black" size="1.2rem" />{" "}
              <span>Bicycles</span>
            </li>
          </ul>
        </div>
        <div className="text-black text-xs p-2 w-fit border border-black rounded">
          View all 37 amenities
        </div>
      </div>
    </div>
  );
};

export default ListingOffers;
