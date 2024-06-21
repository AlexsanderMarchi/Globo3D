import React from "react";
import CountryStore from "../../store/countryStore";

export default function InfoCountry() {
  const { countryFetched } = CountryStore();

  return (
    <div
      class="absolute top-0 left-0 p-4 bg-black bg-opacity-40 text-white border 
      border-blue-700 border-solid rounded-md max-w-xs"
    >
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
            <h2 className="pb-2">
              <span className="text-blue-500">Capital: </span>{" "}
              {countryFetched[0].capital[0]}
            </h2>
            <h2 className="pb-2">
              <span className="text-blue-500">Population: </span>
              {countryFetched[0].population}
            </h2>
            <h2 className="pb-2">
              <span className="text-blue-500">Independent: </span>
              {countryFetched[0].independent ? "Sim" : "Não"}
            </h2>
            <ul className="pb-2">
              {Object.entries(countryFetched[0].currencies || {}).map(
                ([key, value], index) => (
                  <li key={key}>
                    <span className="text-blue-500">Currency: </span>
                    {value.symbol} {value.name}
                  </li>
                )
              )}
            </ul>
            <div className="flex items-top pb-2">
              {Object.keys(countryFetched[0].continents).length > 1 ? (
                <h2 className="text-blue-500">Continents: &nbsp; </h2>
              ) : (
                <h2 className="text-blue-500">Continent: &nbsp; </h2>
              )}
              <ul>
                {countryFetched[0].continents.map((continent, index) => (
                  <li key={index} className="flex items-center ">
                    {countryFetched[0].continents.length > 1 ? (
                      <h2 className="text-blue-500"> {index + 1}. &nbsp; </h2>
                    ) : null}
                    <h2> {continent}</h2>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`flex ${
                Object.keys(countryFetched[0].languages).length > 1
                  ? "flex-col"
                  : "flex-row "
              } items-start pb-2`}
            >
              {Object.keys(countryFetched[0].languages).length > 1 ? (
                <h2 className="text-blue-500">Languages: </h2>
              ) : (
                <h2 className="text-blue-500">Language: </h2>
              )}

              <ul className=" flex flex-wrap items-start  w-full">
                {Object.entries(countryFetched[0].languages || {}).map(
                  ([key, value], index) => (
                    <li key={key} className="flex items-top w-1/2">
                      {Object.keys(countryFetched[0].languages).length > 1 ? (
                        <h2 className="text-blue-500 ">{index + 1}.</h2>
                      ) : null}
                      <h2 className="h-full"> &nbsp;{value}</h2>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
