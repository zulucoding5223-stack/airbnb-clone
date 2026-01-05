import React, { useContext } from "react";
import { AppContext } from "../utils/AppContextProvider";

const InspirationHomeComponent = () => {

  const {locations} = useContext(AppContext);
  const imageURL = 'http://localhost:4000/uploads';

  return (
    <div className="px-10 pt-10 pb-8">
      <h1 className="font-bold text-2xl pb-8">
        Inspiration for your next trip
      </h1>
      <div className="flex items-center justify-between gap-8 overflow-x-auto flex-nowrap hide-scrollbar">
        {locations.map((location, index) => {
          return (
            <div key={index} className="min-w-[250px] flex-1 hover:scale-105 transition-all duration-300 hover:cursor-pointer">
              <img
                src={`${imageURL}/${location.images[1]}`}
                alt=""
                className="w-full h-40 rounded-t-2xl object-cover"
              />
              <div className="bg-red-500 rounded-b-2xl px-2 py-2 text-white">
                <h2 className="text-lg font-bold pt-2 pb-1 ml-2">
                  {location.location}
                </h2>
                <p className="text-sm pb-2 ml-2">{location.country}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InspirationHomeComponent;
