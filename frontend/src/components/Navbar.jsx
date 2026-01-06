import React, { useContext, useState } from "react";

import { siAirbnb } from "simple-icons";
import Icon from "../utils/Icon";
import { FaGlobe } from "react-icons/fa6";
import { TbMenu2 } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import HomepageInput from "../components/homepageComponents/HomepageInput";
import { AppContext } from "../utils/AppContextProvider";


const Navbar = () => {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const { user, logoutState } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-row justify-between items-center px-10 ${
        location.pathname === "/" || location.pathname === "/login"
          ? "pt-5"
          : "pt-2.5 pb-5"
      } ${location.pathname.startsWith("/listing") ? "pt-5" : ""} ${
        location.pathname === "/login" ||
        location.pathname.startsWith("/admin")
          ? ""
          : "shadow"
      }`}
    >
      <Link
        to={user?.role === "host" ? "/admin/dashboard" : "/"}
        className="flex gap-1 items-center"
      >
        <Icon
          icon={siAirbnb}
          className={`${
            location.pathname === "/" ? "text-white" : "text-red-500"
          } w-8`}
        />
        <span
          className={`${
            location.pathname === "/" ? "text-white" : "text-red-500"
          } font-bold text-lg`}
        >
          airbnb
        </span>
      </Link>
      {location.pathname === "/login" ||
      location.pathname.startsWith('/admin') ? (
        ""
      ) : (
        <div>
          {location.pathname === "/locations" ||
          location.pathname.startsWith("/locations") ? (
            <HomepageInput />
          ) : (
            <ul
              className={`flex items-center justify-center gap-3 text-xs ${
                location.pathname === "/" ||
                location.pathname.startsWith("/locations")
                  ? "text-white -mt-1"
                  : "text-black font-semibold"
              }`}
            >
              <NavLink>
                Places to stay
                {!location.pathname.startsWith("/listing") && <hr></hr>}
              </NavLink>
              <NavLink>
                Experiences
                {!location.pathname.startsWith("/listing") && <hr></hr>}
              </NavLink>
              <NavLink>
                Online Experiences
                {!location.pathname.startsWith("/listing") && <hr></hr>}
              </NavLink>
            </ul>
          )}{" "}
        </div>
      )}

      <div
        className={`flex justify-center items-center gap-10 ${
          location.pathname === "/" ? "text-white" : "text-black"
        } ${location.pathname.startsWith("/location") && "text-black"} ${
          location.pathname.startsWith("/listings") &&
          "text-black font-semibold"
        }`}
      >
        <Link
          to="/login"
          className={`text-xs ${user ? "w-fit" : "w-20.5"} ${
            location.pathname === "/login" && "hidden"
          }`}
        >
          {user ? `Welcome, ${user.username}` : "Become a Host"}
        </Link>
        <div className={`${location.pathname === "/login" && "hidden"}`}>
          <FaGlobe size="1.2rem" className="hover:cursor-pointer" />
        </div>

        <div
          className={`flex gap-1 items-center justify-center px-3 py-1.5 rounded-full hover:cursor-pointer relative bg-white ${
            location.pathname === "/login" && "border border-gray-400 -mr-0.5"
          }`}
          onClick={() => setIsClicked((prev) => !prev)}
        >
          <TbMenu2 size="1.45rem" className={` font-bold text-black`} />
          <div className="bg-gray-400 rounded-full p-3 relative overflow-hidden border-gray-400 border-2">
            <IoPerson
              size="1.45rem"
              className="text-white absolute top-1 left-[0.35px]"
            />
          </div>
          <div
            className={`text-sm ${isClicked ? "block" : "hidden"} absolute ${
              user ? "top-13" : "top-14 left-3.5"
            } ${
              location.pathname === "/login"
                ? "text-white bg-black"
                : "text-black bg-white"
            } rounded-xl py-0.5`}
          >
            {user ? (
              <ul className={`w-26 text-xs px-1 py-0.5 shadow`}>
                <li className="w-full hover:bg-blue-300 px-1 py-0.5 rounded">
                  <Link to="/reservations">My Reservations</Link>
                </li>
                <li className="w-full hover:bg-blue-300 px-1 py-0.5 rounded">
                  <button
                    onClick={() => {
                      logoutState();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <Link
                to="/login"
                className={`px-2 pb-1 w-fit rounded-full text-center shadow ${
                  location.pathname !== "/" && "text-white bg-black pt-1 pb-1"
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
