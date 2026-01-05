import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Locations from "./pages/Locations";
import Listing from "./pages/Listing";
import Reservation from "./pages/Reservation";
import AdminDashboard from "./pages/AdminDashboard";
import UserReservations from "./pages/UserReservations";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:location" element={<Locations />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/reservations" element={<UserReservations />} />
        <Route path="/admin/create-listing" element={<CreateListing />} />
        <Route path="/admin/update-listing/:listingId" element={<UpdateListing />} />
      </Routes>
    </div>
  );
};

export default App;
