import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import Navbar from "../components/Navbar";
import AdminNavLinks from "../components/AdminNavLinks";
import AdminForm from "../components/AdminForm";

const UpdateListing = () => {
  const { listingId } = useParams();
  const [initialListing, setInitialListing] = useState(null);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await api.get(
          `/listings/view-host-listing/${listingId}`
        );
        setInitialListing(response.data.listing);
      } catch (error) {
        const message =
          error.response?.data?.message || "Error when fetching a listing.";
        alert(message);
      }
    };
    fetchListing();
  }, [listingId]);
  return (
    <div>
      <div className="pt-2.5">
        <Navbar />
        <AdminNavLinks />

        <h1 className="text-center text-2xl font-bold my-10">Update Listing</h1>
        {initialListing && (
          <AdminForm formState="update" initialListing={initialListing} />
        )}
      </div>
    </div>
  );
};

export default UpdateListing;
