import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { AppContext } from "../utils/AppContextProvider";
import { IoMdShare } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";

import ListingRules from "../components/listingComponents/ListingRules";
import ListingHost from "../components/listingComponents/ListingHost";
import ListingReviews from "../components/listingComponents/ListingReviews";
import ListingCalenders from "../components/listingComponents/ListingCalenders";
import ListingOffers from "../components/listingComponents/ListingOffers";
import ListingCalculator from "../components/listingComponents/ListingCalculator";
import ListingHouseDetails from "../components/listingComponents/ListingHouseDetails";

const Listing = () => {
  const { listingId } = useParams();
  const { locations, isLoading, setIsLoading } = useContext(AppContext);
  const [selectedLocation, setSelectedLocation] = useState(null);

  console.log(locations);

  useEffect(() => {
    if (locations.length > 0) {
      const foundLocation = locations.find(
        (location) => `:${location._id}` === listingId
      );
      setSelectedLocation(foundLocation);
      console.log(foundLocation);
      setIsLoading(false);
    } else{
      setIsLoading(true);
    }
  }, [locations, listingId]);

  console.log("selected location: ", selectedLocation);

  const imageURL = "http://localhost:4000/uploads";

  return (
    <div>
      <Navbar />
      {isLoading || !selectedLocation ? (
        <div className="text-center font-bold text-xl mt-5 mb-2">Loading...</div>
      ) : (
        <div>
          <div className="px-33">
            <div>
              <h1 className="font-bold text-xl mt-5 mb-2">
                Modern {selectedLocation.type} in {selectedLocation.location}
              </h1>
              <div className="flex justify-between text-xs mb-3">
                <div className="flex items-center">
                  <IoStarSharp color="gray" />
                  <p className="text-gray-500 ml-1">
                    {selectedLocation.ratings} (
                    {selectedLocation.reviews.length}) reviews -{" "}
                    {selectedLocation.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <IoMdShare color="gray" />
                  <span>Share</span>
                  <MdFavorite color="gray" />
                  <span>Save</span>
                </div>
              </div>
              <div>
                <div className="flex">
                  <img
                    className="rounded-lg object-cover w-140 h-80 mr-2"
                    src={`${imageURL}/${selectedLocation.images[0]}`}
                    alt=""
                  />
                  <div className="w-115 grid grid-cols-2 gap-2">
                    {selectedLocation.images.slice(0).map((img, index) => {
                      return (
                        <img
                          key={index}
                          className="rounded-lg object-cover w-full h-full"
                          src={`${imageURL}/${img}`}
                          alt=""
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <ListingHouseDetails selectedLocation={selectedLocation} />
                  <ListingCalculator selectedLocation={selectedLocation} />
                </div>
                <div className="pt-3">
                  <h2 className="font-bold text-xl">Where You'll Sleep</h2>
                  <div className="w-65 mt-5">
                    <img
                      src={`${imageURL}/${selectedLocation.images[0]}`}
                      alt=""
                      className="object-center w-fit rounded-xl"
                    />
                  </div>
                  <p className="text-xs text-gray-500 pt-1">
                    Spacious bedroom with comfortable bed.
                  </p>
                  <p className="text-xs text-gray-500 py-1">
                    Total bedrooms: {selectedLocation.bedrooms}
                  </p>
                </div>
                <hr className="text-gray-400 w-160 mt-8 mb-10"></hr>
                <div>
                  <ListingOffers />
                  <hr className="text-gray-400 w-160 mt-12 mb-6"></hr>

                  <ListingCalenders selectedLocation={selectedLocation} />
                </div>
              </div>
              <hr className="text-gray-400 w-full mt-10 mb-1"></hr>

              <ListingReviews selectedLocation={selectedLocation} />
              <hr className="text-gray-400 w-full mt-12 mb-1"></hr>
              <ListingHost selectedLocation={selectedLocation} />
              <hr className="text-gray-400 w-full mt-10 mb-5"></hr>
            </div>
            <ListingRules />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Listing;
