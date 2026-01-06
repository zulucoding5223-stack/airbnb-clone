import React, { createContext, useEffect, useState } from "react";
import img from "../assets/bnb.jpg";
import { MdDescription } from "react-icons/md";
import api from "./axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    const savedToken = sessionStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get("/listings/view-listings");
        setLocations(response.data.listings || []);
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const loginState = (profileData, token) => {
    sessionStorage.setItem("user", JSON.stringify(profileData));
    sessionStorage.setItem("token", token);
    setUser(profileData);
  };

  const logoutState = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    loginState,
    user,
    logoutState,
    locations,
    setLocations,
    setIsLoading,
    isLoading,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
