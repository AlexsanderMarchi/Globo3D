import React, { useEffect } from "react";
import CountryStore from "../../store/countryStore";

export default function ImageCountry() {
  const { countryImages } = CountryStore();

  return (
    <div className="absolute top-0 right-0 p-4 bg-white bg-opacity-75">
      {/* {imageUrls.map((imageUrl, index) => (
        <img
          key={index}
          className="w-20 h-100% mb-4"
          src={imageUrl}
          alt={`Country Image ${index}`}
        />
      ))} */}
    </div>
  );
}
