import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/AppContextProvider";

const AdminForm = ({ formState, initialListing }) => {
  const isUpdate = formState === "update";
  const navigate = useNavigate();
  const { locations, setLocations } = useContext(AppContext);

  const topCitiesWithCountries = [
    { city: "Tokyo", country: "Japan" },
    { city: "Delhi", country: "India" },
    { city: "Shanghai", country: "China" },
    { city: "Cape Town", country: "South Africa" },
    { city: "Mexico City", country: "Mexico" },
    { city: "Cairo", country: "Egypt" },
    { city: "Mumbai", country: "India" },
    { city: "Beijing", country: "China" },
    { city: "Dhaka", country: "Bangladesh" },
    { city: "Osaka", country: "Japan" },
    { city: "New York", country: "USA" },
    { city: "Karachi", country: "Pakistan" },
    { city: "Buenos Aires", country: "Argentina" },
    { city: "Durban", country: "South Africa" },
    { city: "Istanbul", country: "Turkey" },
    { city: "Paris", country: "France" },
    { city: "Manila", country: "Philippines" },
    { city: "Lagos", country: "Nigeria" },
    { city: "London", country: "United Kingdom" },
    { city: "Tianjin", country: "China" },
  ];

  const listingTypes = [
    "Apartment",
    "House",
    "Villa",
    "Condominium",
    "Cottage",
    "Loft",
    "Guesthouse",
    "Bungalow",
    "Cabin",
    "Studio",
  ];

  const [amenity, setAmenity] = useState("");
  const [amenitiesArray, setAmenitiesArray] = useState(
    isUpdate ? initialListing.amenities : []
  );
  const [title, setTitle] = useState(isUpdate ? initialListing.title : "");
  const [location, setLocation] = useState(
    isUpdate ? initialListing.location : ""
  );
  const [country, setCountry] = useState(
    isUpdate ? initialListing.country : ""
  );
  const [description, setDescription] = useState(
    isUpdate ? initialListing.description : ""
  );
  const [enhancedCleaning, setEnhancedCleaning] = useState(
    isUpdate ? initialListing.enhancedCleaning : false
  );
  const [selfCheckIn, setSelfCheckIn] = useState(
    isUpdate ? initialListing.selfCheckIn : false
  );
  const [price, setPrice] = useState(
    isUpdate ? String(initialListing.price) : "0"
  );
  const [type, setType] = useState(isUpdate ? initialListing.type : "");
  const [guests, setGuests] = useState(
    isUpdate ? String(initialListing.guests) : "0"
  );
  const [bathrooms, setBathrooms] = useState(
    isUpdate ? String(initialListing.bathrooms) : "0"
  );
  const [bedrooms, setBedrooms] = useState(
    isUpdate ? String(initialListing.bedrooms) : "0"
  );
  const [cleaningFee, setCleaningFee] = useState(
    isUpdate ? String(initialListing.cleaningFee) : "0"
  );
  const [serviceFee, setServiceFee] = useState(
    isUpdate ? String(initialListing.serviceFee) : "0"
  );
  const [occupancyFee, setOccupancyFee] = useState(
    isUpdate ? String(initialListing.occupancyFee) : "0"
  );
  const [weeklyDiscount, setWeeklyDiscount] = useState(
    isUpdate ? String(initialListing.weeklyDiscount) : "0"
  );
  const [images, setImages] = useState([]);

  const handleAddAmenity = () => {
    if (amenity.trim() !== "") {
      setAmenitiesArray((prev) => [...prev, amenity]);
      setAmenity("");
    } else {
      return;
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length !== 5) {
      alert("You can upload 5 images.");
      return;
    }

    setImages(selectedFiles);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("location", location);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("enhancedCleaning", enhancedCleaning);
    formData.append("selfCheckIn", selfCheckIn);
    formData.append("price", Number(price));
    formData.append("type", type);
    formData.append("guests", Number(guests));
    formData.append("bedrooms", Number(bedrooms));
    formData.append("bathrooms", Number(bathrooms));
    formData.append("cleaningFee", Number(cleaningFee));
    formData.append("serviceFee", Number(serviceFee));
    formData.append("occupancyFee", Number(occupancyFee));
    formData.append("weeklyDiscount", Number(weeklyDiscount));
    formData.append("amenities", JSON.stringify(amenitiesArray));

    if (images.length > 0) {
      images.forEach((img) => {
        formData.append("images", img);
      });
    }

    try {
      if (formState === "create") {
        const response = await api.post("/listings/create-listing", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert(response.data?.message);
        setLocations((prev) => [...prev, response.data.listing]);
      }

      if (formState === "update") {
        const response = await api.put(
          `/listings/update-listing/${initialListing._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert(response?.data?.message);
        if (response?.data?.updatedListing) {
          setLocations((prev) =>
            prev.map((listing) =>
              listing._id === initialListing._id
                ? response.data.updatedListing
                : listing
            )
          );
        }
      }

      navigate("/admin/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="text-xs mx-auto w-fit flex items-center flex-row gap-5">
        <div className="w-80 flex flex-col gap-2.5 h-screen">
          <div className="flex items-start flex-col gap-1 mb-2">
            <label htmlFor="listing-title">Listing Title</label>
            <input
              type="text"
              className="p-1 rounded-lg border-2 w-full"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="flex items-start flex-col gap-1 mb-2">
            <label htmlFor="listing-location">Location</label>
            <select
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="p-1 rounded-lg border-2 w-full"
            >
              <option value="">Select location</option>
              {topCitiesWithCountries.map((item, index) => (
                <option key={index} value={item.city}>
                  {item.city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-start flex-col gap-1 mb-2">
            <label htmlFor="listing-location">Country</label>
            <select
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              className="p-1 rounded-lg border-2 w-full"
            >
              <option value="">Select country</option>
              {topCitiesWithCountries.map((item, index) => (
                <option key={index} value={item.country}>
                  {item.country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-start flex-col gap-1 mb-2">
            <label htmlFor="listing-description">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="p-1 rounded-lg border-2 w-full h-25"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-row gap-1 mb-2">
              <input
                type="checkbox"
                onChange={(e) => setEnhancedCleaning(e.target.checked)}
                checked={enhancedCleaning}
              />
              <label htmlFor="listing-enhancedCleaning">
                Enhanced Cleaning
              </label>
            </div>
            <div className="flex items-center flex-row gap-1 mb-2">
              <input
                type="checkbox"
                onChange={(e) => setSelfCheckIn(e.target.checked)}
                checked={selfCheckIn}
              />
              <label htmlFor="listing-selfCheckIn">Self Check-in</label>
            </div>
          </div>
          <div>
            <label htmlFor="listing-amenities">Amenities</label>
            <div className="flex items-center flex-row gap-1 mb-2 mt-1">
              <input
                type="text"
                className="p-1 rounded-lg border-2 w-full"
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="bg-blue-700 text-white py-1.5 px-3 w-fit rounded-lg text-center hover:cursor-pointer"
              >
                Add
              </button>
            </div>
            <div>
              {amenitiesArray.map((amenity, index) => {
                return (
                  <div
                    key={index}
                    className="mb-2"
                    onClick={() => {
                      setAmenitiesArray(
                        amenitiesArray.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <p className="py-1.5 px-3 w-full text-xs text-black bg-gray-200 rounded">
                      {amenity}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-80 flex flex-col gap-2.5 h-screen">
          <div className="flex items-center flex-row gap-2.5">
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="listingPrice">Price</label>
              <input
                type="text"
                className="p-1 rounded-lg border-2 w-39"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="listingType">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="p-1 rounded-lg border-2 w-39"
              >
                <option value="">Select type</option>
                {listingTypes.map((listingType, index) => (
                  <option key={index} value={listingType}>
                    {listingType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-2 mb-3">
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="listingGuests">Guests</label>
              <input
                type="text"
                className="p-1 rounded-lg border-2 w-full"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="listingBedrooms">Bedrooms</label>
              <input
                type="text"
                className="p-1 rounded-lg border-2 w-full"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="listingBathrooms">Bathrooms</label>
              <input
                type="text"
                className="p-1 rounded-lg border-2 w-full"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-2 mb-3">
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="listingGuests">Cleaning Fee</label>
              <input
                type="text"
                className="p-1 rounded-lg border-2 w-full"
                value={cleaningFee}
                onChange={(e) => setCleaningFee(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="listingBedrooms">Service Fee</label>
              <input
                type="text"
                className="p-1 rounded-lg border-2 w-full"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <label htmlFor="listingBathrooms">Occupancy Fee</label>
              <input
                type="text"
                className="p-1 rounded-lg border-2 w-full"
                value={occupancyFee}
                onChange={(e) => setOccupancyFee(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <label htmlFor="listingBathrooms">Weekly Discount</label>
            <input
              type="text"
              className="p-1 rounded-lg border-2 w-full"
              value={weeklyDiscount}
              onChange={(e) => setWeeklyDiscount(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("imageUpload").click()}
            className="rounded-lg bg-blue-800 text-white py-2 text-center px-3 mt-4 w-fit hover:cursor-pointer"
          >
            Upload Images
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            id="imageUpload"
            onChange={(e) => handleImageChange(e)}
            className="border-2 h-25 rounded-lg mb-3"
            required
          />
          <div className="flex flex-row justify-between items-center gap-2.5">
            <button
              type="submit"
              className="w-full text-center py-2 px-3 bg-blue-800 text-white rounded-lg hover:cursor-pointer"
            >
              {formState === "create" ? "Create" : "Update"}
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              className="w-full text-center py-2 px-3 bg-red-800 text-white rounded-lg hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminForm;
