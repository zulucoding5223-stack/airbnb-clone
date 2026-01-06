import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
import { AppContext } from "../utils/AppContextProvider";
import { HiStar } from "react-icons/hi2";
import AdminNavLinks from "../components/adminComponents/AdminNavLinks";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const [listings, setListings] = useState([]);
  const { isLoading, locations } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (locations && locations.length > 0) {
      setListings(locations);
    }
  }, [locations]);

  const imageURL = "http://localhost:4000/uploads";

  const handleDeleteListing = async (listingId) => {
    try {
      await api.delete(`/listings/delete-listing/${listingId}`);
      const newListings = listings.filter(
        (listing) => listing._id !== listingId
      );
      setListings(newListings);
    } catch (error) {
      const message =
        error.response?.data?.message || "Error when deleting a listing.";
      alert(message);
    }
  };

  return (
    <div className="pt-2.5">
      <>
        {location.pathname === '/admin/view-listings' ? <></> : <Navbar/>}
      </>
      <AdminNavLinks />

      <div className="mx-17">
        <h1 className="text-center text-2xl font-bold my-10">My Listings</h1>

        {isLoading ? (
          <h1 className="text-center text-2xl font-bold my-13">Loading...</h1>
        ) : listings.length === 0 ? (
          <h1 className="text-center text-gray-500">No listings found</h1>
        ) : (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="shadow-lg border border-gray-200 rounded-lg py-3 px-15 w-full mb-7 flex flex-row gap-15 hover:cursor-pointer hover:scale-105 transition-all duration-300"
            >
              
              <div className="flex items-start flex-col gap-3">
                <div className="w-45">
                  <img
                    src={
                      listing?.images?.length > 0
                        ? `${imageURL}/${listing.images[0]}`
                        : "/placeholder.png"
                    }
                    alt={listing?.title || "Listing"}
                    className="object-fill w-full h-45 rounded-lg"
                  />
                </div>

                <button
                  onClick={() =>
                    navigate(`/admin/update-listing/${listing._id}`)
                  }
                  className="text-center w-45 text-white bg-blue-800 text-xs py-2 rounded-lg"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-center w-45 text-white bg-red-500 text-xs py-2 rounded-lg hover:cursor-pointer"
                >
                  Delete
                </button>
              </div>

              
              <div className="flex items-start flex-col gap-2">
                <p className="text-xs text-gray-500">
                  {listing.type} - {listing.location}
                </p>

                <h2 className="text-2xl font-bold">
                  {listing.title} in {listing.location}
                </h2>

                <hr className="w-15 h-1 text-gray-300 my-2" />

                <p className="text-gray-500 text-xs mb-2">
                  {listing.guests} guests - {listing.type} - {listing.bedrooms}{" "}
                  bedrooms {listing.bathrooms} bathrooms
                </p>

                <p className="text-gray-500 text-xs scale-95 -mt-4 -ml-1">
                  amenities: {listing.amenities?.join(", ") || "None"}
                </p>

                <hr className="w-15 h-1 text-gray-300 my-2" />

                <div className="flex items-center gap-100 text-xs text-gray-500">
                  <p className="flex items-center gap-1.5">
                    <HiStar color="#EDDE0E" size="1rem" />
                    {listing.ratings || 0} ({listing.reviews}{" "}
                    reviews)
                  </p>
                  <p className="font-bold text-black text-sm">
                    ${listing.price}/night
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
