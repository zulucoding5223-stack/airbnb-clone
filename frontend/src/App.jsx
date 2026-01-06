import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Locations from "./pages/Locations";
import Listing from "./pages/Listing";
import Reservation from "./pages/Reservation";
import AdminDashboard from "./pages/AdminDashboard";
import UserReservations from "./pages/UserReservations";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import { useContext } from "react";
import { AppContext } from "./utils/AppContextProvider";

const App = () => {
  const { user } = useContext(AppContext);
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/locations/:location" element={<Locations />} />
      <Route path="/listing/:listingId" element={<Listing />} />
      <Route path="/reservations" element={<Reservation />} />

      {user?.role === "host" && (
        <>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/view-listings" element={<AdminDashboard />} />
          <Route path="/admin/reservations" element={<UserReservations />} />
          <Route path="/admin/create-listing" element={<CreateListing />} />
          <Route
            path="/admin/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </>
      )}
    </Routes>
  );
};

export default App;
