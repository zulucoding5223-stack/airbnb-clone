import React, { useContext } from "react";
import { AppContext } from "../../utils/AppContextProvider";

const InspirationHomeComponent = () => {
  const { locations } = useContext(AppContext);
  const imageURL = "http://localhost:4000/uploads";

  return (
    <div className="px-10 pt-10 pb-8">
      <h1 className="font-bold text-2xl pb-8">
        Inspiration for your next trip
      </h1>
      <div className="flex items-center gap-8 overflow-x-auto flex-nowrap hide-scrollbar justify-center">
        {locations.map((location, index) => {
          return (
            <div
              key={index}
              className="min-w-[250px] max-w-[250px] shrink-0 hover:scale-105 transition-all duration-300 hover:cursor-pointer"
            >
              <img
                src={
                  location.images?.length
                    ? `${imageURL}/${location.images[0]}`
                    : "/placeholder.png"
                }
                alt=""
                className="w-full h-60 rounded-t-2xl object-fill"
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
