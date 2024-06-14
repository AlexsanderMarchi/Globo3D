import React from "react";
import CountryStore from "../../store/countryStore";

export default function InfoCountry() {
  const { country } = CountryStore();

  return (
    <div id="overlay" class="absolute top-0 left-0 p-4 bg-white bg-opacity-75">
      <h1>{country}</h1>
    </div>
  );
}
