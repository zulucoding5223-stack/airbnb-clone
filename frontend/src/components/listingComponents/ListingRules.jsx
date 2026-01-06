import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { GoFlame } from "react-icons/go";
import { LiaBabyCarriageSolid } from "react-icons/lia";
import { PiBone, PiNumberCircleZeroLight } from "react-icons/pi";
import { TbAlarmSmoke, TbDoorEnter } from "react-icons/tb";
import { LuPartyPopper } from "react-icons/lu";
import { TfiSpray } from "react-icons/tfi";
import { CiCreditCard1 } from "react-icons/ci";

const ListingRules = () => {
  return (
    <div>
      <div className="mx-5 flex flex-row justify-between mb-10">
        <ul className="flex flex-col gap-1.5 hover:cursor-pointer">
          <li>
            <h2 className="font-bold text-xl">House Rules</h2>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <AiOutlineClockCircle />
              Check-in: After 4:00 PM
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <AiOutlineClockCircle />
              Check-out: 10:00 AM
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <TbDoorEnter />
              Self check-in with lock-box
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <LiaBabyCarriageSolid />
              Not suitable for infants {"(under 2 years)"}
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <GoFlame />
              No smoking
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <PiBone />
              No pets
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <LuPartyPopper />
              No parties or events
            </span>
          </li>
        </ul>
        <ul className="flex flex-col gap-1.5 hover:cursor-pointer">
          <li>
            <h2 className="font-bold text-xl">Health & Safety</h2>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <BsStars />
              <div className="flex items-start flex-col">
                <span>Committed to Airbnb's enhanced cleaning process.</span>{" "}
                <span className="underline text-blue-800">Show more</span>
              </div>
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <TfiSpray />
              <div className="flex items-start flex-col">
                <span>Airbnb's social-distancing and other COVID-19-</span>{" "}
                <span>related guidelines apply</span>
              </div>
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <TbAlarmSmoke />
              Carbon monoxide alarm
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <PiNumberCircleZeroLight />
              Smoke alarm
            </span>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              <CiCreditCard1 />
              <div className="flex items-start flex-col">
                <span>Security Deposit - if you damage the home,you may</span>{" "}
                <span>be charged up too $566</span>
              </div>
            </span>
          </li>
          <li className="text-xs ml-4">
            <span className="underline text-blue-800">Show more</span>
          </li>
        </ul>
        <ul className="flex flex-col gap-1.5 hover:cursor-pointer">
          <li>
            <h2 className="font-bold text-xl">Cancellation Policy</h2>
          </li>
          <li className="text-xs">
            <span className="flex items-center gap-1">
              Free cancellation before Feb 14
            </span>
          </li>
          <li className="text-xs">
            <span className="underline text-blue-800">Show more</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListingRules;
