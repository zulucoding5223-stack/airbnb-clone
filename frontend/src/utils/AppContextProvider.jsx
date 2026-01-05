import React, { createContext, useEffect, useState } from "react";
import img from "../assets/bnb.jpg";
import { MdDescription } from "react-icons/md";
import api from "./axios";

const listings = [
  {
    id: "1",
    location: "Durban",
    country: "South Africa",
    type: "Entire house",
    guests: "4",
    rooms: {
      bedrooms: "2",
      bathrooms: "2",
    },
    amenities: ["wifi", "kitchen", "parking"],
    image: img,
    ratings: {
      stars: "4.5",
      reviews: "320",
    },
    price: "320",
    host: "Lucia",
    weeklyDiscount: "10",
    cleaningFee: "50",
    serviceFee: "20",
    occupancyTaxes: "20",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, autem necessitatibus harum repudiandae ut debitis similique, facere asperiores veniam architecto quo quasi, hic nesciunt culpa velit quam libero quia.",
  },
  {
    id: "2",
    location: "Cape Town",
    country: "South Africa",
    type: "Entire house",
    guests: "4",
    rooms: {
      bedrooms: "2",
      bathrooms: "2",
    },
    amenities: ["wifi", "kitchen", "parking"],
    image: img,
    ratings: {
      stars: "4.5",
      reviews: "320",
    },
    price: "320",
    host: "Lucia",
    weeklyDiscount: "5",
    cleaningFee: "50",
    serviceFee: "20",
    occupancyTaxes: "20",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, autem necessitatibus harum repudiandae ut debitis similique, facere asperiores veniam architecto quo quasi, hic nesciunt culpa velit quam libero quia.",
  },
  {
    id: "3",
    location: "Johannesburg",
    country: "South Africa",
    type: "Entire house",
    guests: "4",
    rooms: {
      bedrooms: "2",
      bathrooms: "2",
    },
    amenities: ["wifi", "kitchen", "parking"],
    image: img,
    ratings: {
      stars: "4.5",
      reviews: "320",
    },
    price: "320",
    host: "Lucia",
    weeklyDiscount: "15",
    cleaningFee: "50",
    serviceFee: "20",
    occupancyTaxes: "20",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, autem necessitatibus harum repudiandae ut debitis similique, facere asperiores veniam architecto quo quasi, hic nesciunt culpa velit quam libero quia.",
  },
  {
    id: "4",
    location: "Durban",
    country: "South Africa",
    type: "Entire house",
    guests: "4",
    rooms: {
      bedrooms: "2",
      bathrooms: "2",
    },
    amenities: ["wifi", "kitchen", "parking"],
    image: img,
    ratings: {
      stars: "4.5",
      reviews: "320",
    },
    price: "320",
    host: "Lucia",
    weeklyDiscount: "5",
    cleaningFee: "50",
    serviceFee: "20",
    occupancyTaxes: "20",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, autem necessitatibus harum repudiandae ut debitis similique, facere asperiores veniam architecto quo quasi, hic nesciunt culpa velit quam libero quia.",
  },
  {
    id: "5",
    location: "Johannesburg",
    country: "South Africa",
    type: "Apartment",
    guests: "4",
    rooms: {
      bedrooms: "2",
      bathrooms: "2",
    },
    amenities: ["wifi", "kitchen", "parking"],
    image: img,
    ratings: {
      stars: "4.5",
      reviews: "320",
    },
    price: "320",
    host: "Lucia",
    weeklyDiscount: "0",
    cleaningFee: "50",
    serviceFee: "20",
    occupancyTaxes: "20",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, autem necessitatibus harum repudiandae ut debitis similique, facere asperiores veniam architecto quo quasi, hic nesciunt culpa velit quam libero quia.",
  },
  {
    id: "6",
    location: "Cape Town",
    country: "South Africa",
    type: "Entire house",
    guests: "4",
    rooms: {
      bedrooms: "2",
      bathrooms: "2",
    },
    amenities: ["wifi", "kitchen", "parking"],
    image: img,
    ratings: {
      stars: "4.5",
      reviews: "320",
    },
    price: "320",
    host: "Lucia",
    weeklyDiscount: "30",
    cleaningFee: "50",
    serviceFee: "20",
    occupancyTaxes: "20",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos excepturi, autem necessitatibus harum repudiandae ut debitis similique, facere asperiores veniam architecto quo quasi, hic nesciunt culpa velit quam libero quia.",
  },
];

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
        setLocations(response.data.data)
      } catch (error) {
        const message =
          error.response?.data?.message || "Something went wrong.";
        console.log(message);
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
    listings,
    loginState,
    user,
    logoutState,
    locations,
    setIsLoading,
    isLoading
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
