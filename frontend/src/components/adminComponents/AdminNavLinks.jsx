import React from "react";
import { Link } from "react-router-dom";

const AdminNavLinks = () => {
  return (
    <div className="mx-17">
      <div className="text-xs flex items-start gap-5 mt-3">
        <Link
          to="/admin/reservations"
          className="text-center py-1 px-2 w-fit border rounded-full"
        >
          View Reservations
        </Link>
        <Link
          to="/admin/view-listings"
          className="text-center py-1 px-2 w-fit border rounded-full"
        >
          View Listings
        </Link>
        <Link
          to="/admin/create-listing"
          className="text-center py-1 px-2 w-fit border rounded-full"
        >
          Create Listing
        </Link>
      </div>
    </div>
  );
};

export default AdminNavLinks;
