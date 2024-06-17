import React from "react";
import CountryStore from "../../store/countryStore";

export default function InfoCountry() {
  const { countryFetched } = CountryStore();

  return (
    <div class="absolute top-0 left-0 p-4 bg-white bg-opacity-75">
      {countryFetched.length > 0 && (
        <>
          <div className="flex flex-col">
            <div className="flex items-center ">
              <img
                src={countryFetched[0].flags.png}
                alt={countryFetched[0].flags.alt}
                className="w-20 h-100% mb-4"
              />
              <h1 className="ml-4">{countryFetched[0].name.common}</h1>
              <h3 className="ml-1">({countryFetched[0].cca3})</h3>
            </div>
            <h2>Capital: {countryFetched[0].capital[0]}</h2>
            <h2>Population: {countryFetched[0].population}</h2>
            <ul>
              {countryFetched[0].continents.map((continent, index) => (
                <li key={index}>
                  Continent {index + 1}: {continent}
                </li>
              ))}
            </ul>
            <ul>
              {Object.entries(countryFetched[0].currencies || {}).map(
                ([key, value], index) => (
                  <li key={key}>
                    Currency {index + 1}: {value.symbol} {value.name}
                  </li>
                )
              )}
            </ul>
            <ul>
              {Object.entries(countryFetched[0].languages || {}).map(
                ([key, value], index) => (
                  <li key={key}>
                    Language {index + 1}: {value}
                  </li>
                )
              )}
            </ul>
            <h2>
              Independent: {countryFetched[0].independent ? "Sim" : "Não"}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}
