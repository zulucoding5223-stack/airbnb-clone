import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/AppContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const HomepageInput = () => {
  const [place, setPlace] = useState("Select a location");
  const [isVisible, setIsVisible] = useState(false);
  const { locations } = useContext(AppContext);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const handleLocationNavigation = (placeToNavigate) => {
    if (placeToNavigate === "Select a location") {
      alert("Please select other location");
    } else if (placeToNavigate === "All locations") {
      navigate("/locations");
      window.scrollTo(0, 0);
    } else {
      navigate(`/locations/:${placeToNavigate}`);
      window.scrollTo(0, 0);
    }
  };

  const allLocations = locations.map((location) => location.location);

  const newLocations = [];

  allLocations.forEach((location) => {
    if (!newLocations.includes(location)) {
      newLocations.push(location);
    }
  });

  useEffect(() => {
    if (params.location) {
      setPlace(params.location.slice(1));
    } else if (location.pathname === "/locations") {
      setPlace("All locations");
    } else if (location.pathname === "/") {
      setPlace("Select a location");
    }
  }, [params, location.pathname]);

  return (
    <div className={`w-full pb-1 ${location.pathname === "/" ? "pt-3.5" : ""}`}>
      <div
        className={`bg-white pl-8 pr-2 py-1  w-fit mx-auto text-xs flex items-center gap-2 flex-row rounded-full text-gray-600 shadow-md ${
          location.pathname === "/locations" ||
          location.pathname.startsWith("/locations")
            ? "mt-3"
            : ""
        }`}
      >
        <div className="flex items-center gap-2 flex-row">
          <div className="flex flex-col items-start relative mr-3">
            <span
              className={`text-xs ${
                location.pathname === "/locations" ||
                location.pathname.startsWith("/locations")
                  ? "text-black"
                  : "text-gray-600"
              }`}
            >
              Locations
            </span>
            <span
              onClick={() => {
                setIsVisible((prev) => !prev);
              }}
              className={`w-22 hover:cursor-pointer ${
                location.pathname === "/locations" ||
                location.pathname.startsWith("/locations")
                  ? "text-black"
                  : "text-gray-400"
              }`}
            >
              {place}
            </span>
            <ul
              className={`bg-white p-1 absolute top-8 -left-2 w-fit ${
                isVisible ? "block" : "hidden"
              } z-20 w-21 ${
                location.pathname === "/locations" ||
                location.pathname.startsWith("/locations")
                  ? "text-black"
                  : "text-gray-400"
              }`}
            >
              <li
                className="px-1 rounded hover:bg-blue-300 hover:cursor-pointer w-24"
                onClick={(e) => {
                  setIsVisible(false);
                  setPlace(e.target.innerHTML);
                  handleLocationNavigation(e.target.innerHTML);
                }}
              >
                Select a location
              </li>
              <li
                className="px-1 rounded hover:bg-blue-300 hover:cursor-pointer"
                onClick={(e) => {
                  setIsVisible(false);
                  setPlace(e.target.innerHTML);
                  handleLocationNavigation(e.target.innerHTML);
                }}
              >
                All locations
              </li>
              {newLocations.map((listing, index) => {
                return (
                  <li
                    className="px-1 rounded hover:bg-blue-300 hover:cursor-pointer"
                    key={index}
                    onClick={(e) => {
                      setIsVisible(false);
                      setPlace(e.target.innerHTML);
                      handleLocationNavigation(e.target.innerHTML);
                    }}
                  >
                    {listing}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="w-0.5 h-7.5 bg-gray-300 mr-3"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs">Check In</span>
            <input
              type="date"
              className="w-22 hover:cursor-pointer text-gray-400"
            />
          </div>

          <div className="w-0.5 h-7.5 bg-gray-300 mr-3 ml-2"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs">Check Out</span>
            <input
              type="date"
              className="w-22 hover:cursor-pointer text-gray-400"
            />
          </div>

          <div className="w-0.5 h-7.5 bg-gray-300 mr-2 ml-3"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs">Guests</span>
            <input
              type="number"
              placeholder="Guests"
              className="w-22 hover:cursor-pointer focus:outline-none"
            />
          </div>

          <div className="w-0.5 h-7.5 bg-gray-300 mr-0.5 ml-0.5"></div>
        </div>
        <div>
          <div className="bg-pink-600 p-1 rounded-full ml-3 hover:cursor-pointer">
            <IoIosSearch size='1.3rem' className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageInput;
