import React from "react";
import { IoStarSharp } from "react-icons/io5";
const imageURL = "http://localhost:4000/uploads";
import reviewsOne from '../../assets/reviews-1.webp';
import reviewsTwo from '../../assets/reviews-2.webp';
import reviewsThree from '../../assets/reviews-3.webp';
import reviewsFour from '../../assets/reviews-4.webp';
import reviewsFive from '../../assets/reviews-5.webp';
import reviewsSix from '../../assets/reviews-6.webp';


const ListingReviews = ({ selectedLocation }) => {
  return (
    <div>
      <div className="flex items-center text-sm font-bold">
        <IoStarSharp color="red" /> {selectedLocation.ratings} -{" "}
        {selectedLocation.reviews} reviews
      </div>
      <div className="pt-5 flex items-center justify-between text-xs">
        <ul className="flex gap-1 flex-col">
          <li>Cleanliness</li>
          <li>Communication</li>
          <li>Check-in</li>
        </ul>
        <ul className="flex gap-1 flex-col">
          <li className="flex items-center gap-1.5">
            <div className="h-1.5 bg-black rounded w-50"></div>
            <span>5.0 Accuracy</span>
          </li>
          <li className="flex items-center gap-1.5 relative">
            <div className="h-1.5 bg-gray-200 rounded w-50 z-0"></div>
            <div className="absolute bg-black rounded w-43 top-1.1 z-10 h-1.5 left-0"></div>
            <span>4.7 Location</span>
          </li>
          <li className="flex items-center gap-1.5 relative">
            <div className="h-1.5 bg-gray-200 rounded w-50 z-0"></div>
            <div className="absolute bg-black rounded w-47 top-1.1 z-10 h-1.5 left-0"></div>
            <span>4.8 Value</span>
          </li>
        </ul>
        <ul className="flex gap-1 flex-col">
          <li className="flex items-center gap-1.5 relative">
            <div className="h-1.5 bg-gray-200 rounded w-50 z-0"></div>
            <div className="absolute bg-black rounded w-37 top-1.1 z-10 h-1.5 left-0"></div>
            <span>3.0</span>
          </li>
          <li className="flex items-center gap-1.5 relative">
            <div className="h-1.5 bg-gray-200 rounded w-50 z-0"></div>
            <div className="absolute bg-black rounded w-50 top-1.1 z-10 h-1.5 left-0"></div>
            <span>5.0</span>
          </li>
          <li className="flex items-center gap-1.5 relative">
            <div className="h-1.5 bg-gray-200 rounded w-50 z-0"></div>
            <div className="absolute bg-black rounded w-43 top-1.1 z-10 h-1.5 left-0"></div>
            <span>4.7</span>
          </li>
        </ul>
      </div>
      <div className="mt-12 text-xs flex gap-70">
        <ul>
          <li>
            <div className="flex items-center flex-row gap-2">
              <img
                src={reviewsOne}
                alt="review-1-profile"
                className="object-cover h-12 w-12 rounded-full"
              />
              <div className="flex items-start flex-col">
                <p className="font-bold">Alice</p>
                <p className="text-gray-500">March 2025</p>
              </div>
            </div>
            <p className="text-xs pt-3 pb-4">
              Amazing place, very clean and well-located
            </p>
          </li>
          <li>
            <div className="flex items-center flex-row gap-2">
              <img
                src={reviewsTwo}
                alt="review-2-profile"
                className="object-cover h-12 w-12 rounded-full"
              />
              <div className="flex items-start flex-col">
                <p className="font-bold">Julia</p>
                <p className="text-gray-500">December 2024</p>
              </div>
            </div>
            <p className="text-xs pt-3 pb-4">
              Beautiful location. I was very happy
            </p>
          </li>
          <li>
            <div className="flex items-center flex-row gap-2">
              <img
                src={reviewsThree}
                alt="review-3-profile"
                className="object-cover h-12 w-12 rounded-full"
              />
              <div className="flex items-start flex-col">
                <p className="font-bold">Lucy</p>
                <p className="text-gray-500">April 2024</p>
              </div>
            </div>
            <p className="text-xs pt-3 pb-4">
              A wonderful place to be. I highly recommend it.
            </p>
          </li>
        </ul>
        <ul>
          <li>
            <div className="flex items-center flex-row gap-2">
              <img
                src={reviewsFour}
                alt="review-4-profile"
                className="object-cover h-12 w-12 rounded-full"
              />
              <div className="flex items-start flex-col">
                <p className="font-bold">Jack</p>
                <p className="text-gray-500">March 2025</p>
              </div>
            </div>
            <p className="text-xs pt-3 pb-4">
              The best airbnb I have ever been at.
            </p>
          </li>
          <li>
            <div className="flex items-center flex-row gap-2">
              <img
                src={reviewsFive}
                alt="review-5-profile"
                className="object-cover h-12 w-12 rounded-full"
              />
              <div className="flex items-start flex-col">
                <p className="font-bold">Fred</p>
                <p className="text-gray-500">October 2024</p>
              </div>
            </div>
            <p className="text-xs pt-3 pb-4">
              If you want a clean airbnb, go to this one.
            </p>
          </li>
          <li>
            <div className="flex items-center flex-row gap-2">
              <img
                src={reviewsSix}
                alt="review-6-profile"
                className="object-cover h-12 w-12 rounded-full"
              />
              <div className="flex items-start flex-col">
                <p className="font-bold">James</p>
                <p className="text-gray-500">January 2025</p>
              </div>
            </div>
            <p className="text-xs pt-3 pb-4">
              If you want a holiday getaway. Come here.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-2 mb-8">
        <button className="rounded p-2 text-xs border">
          Show all 12 reviews
        </button> 
      </div>
    </div>
  );
};

export default ListingReviews;
