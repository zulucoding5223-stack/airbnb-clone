import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../utils/AppContextProvider";

const Locations = () => {
  const { location: locationParam } = useParams();
  console.log(locationParam);
  const [filterListing, setFilterListing] = useState([]);
  const { locations, isLoading, setIsLoading } = useContext(AppContext);
  const imageURL = "http://localhost:4000/uploads";

  const applyFilter = () => {
    if (locationParam) {
      setFilterListing(
        locations.filter(
          (location) => `:${location.location}` === locationParam
        )
      );
    } else {
      setFilterListing(locations);
    }
  };

  useEffect(() => {
    if (locations && locations.length >= 0) {
      applyFilter();
      setIsLoading(false);
    }
  }, [locations, locationParam]);

  console.log(filterListing)

  const navigate = useNavigate();

  return (
    <div className="overflow-y-scroll hide-scrollbar h-screen">
      <div className="sticky top-0 z-20 bg-white">
        <Navbar />
      </div>

      <div className="px-10 mt-4">
        {isLoading ? (
          <div className="text-center font-semi-bold text-xl mb-7">
            Loading...
          </div>
        ) : (
          <div>
            <div className="text-center font-semi-bold text-xl mb-7">
              {filterListing.length === 1 ? (
                <h1>{filterListing.length} stay in all locations</h1>
              ) : (
                <h1>{filterListing.length} stays in all locations</h1>
              )}
            </div>

            <div className="text-gray-600 text-xs">
              {filterListing.map((location, index) => {
                return (
                  <div
                    key={index}
                    className="shadow-lg border border-gray-200 rounded w-fit pl-3 pr-4.5 pt-3 pb-4 mx-auto h-fit mb-3 hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                    onClick={() => navigate(`/listing/:${location._id}`)}
                  >
                    <div className="flex w-[60vw]">
                      <img
                        src={`${imageURL}/${location.images[0]}`}
                        alt=""
                        className="w-35 h-35 rounded object-cover "
                      />
                      <div className="ml-5">
                        <div className="flex flex-col mb-3">
                          <span>{location.type}</span>
                          <span className="font-bold text-lg text-black">
                            {location.location}
                          </span>
                        </div>
                        <hr className="text-gray-600 w-10" />
                        <p className="mt-2">
                          {location.guests} guests - {location.type} -{" "}
                          {location.bedrooms} bedrooms - {location.bathrooms}{" "}
                          bathrooms
                        </p>
                        <div className="pt-1 mb-5 flex">
                          {location.amenities.length > 0
                            ? location.amenities.join(" - ")
                            : "Wifi - Parking - Pool"}
                        </div>
                        <hr className="text-gray-600 w-10" />
                      </div>
                    </div>
                    <div className="flex items-center ml-40 justify-between">
                      <span>
                        *{location.ratings} ({location.reviews.length} reviews)
                      </span>
                      <p className="relative mr-8">
                        <span className="font-bold text-lg text-black">
                          ${location.price}
                        </span>
                        <span className="absolute top-2 left-10">
                          <span className="mr-1 ml-1">/</span>night
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Locations;
