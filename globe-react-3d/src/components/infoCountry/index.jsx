import React, { useEffect, useState } from "react";
import CountryStore from "../../store/countryStore";
import NightEarthStore from "../../store/nightEarthStore";

export default function InfoCountry() {
  const { countryFetched } = CountryStore();
  const { nightEarthState } = NightEarthStore();

  const earthThemeButton = () => {
    if (!nightEarthState) {
      NightEarthStore.getState().changeBoolean(true);
    } else {
      NightEarthStore.getState().changeBoolean(false);
    }
  };

  return (
    <div
      class="absolute top-0 left-0 p-4 m-1 bg-black bg-opacity-40 text-white border 
      border-blue-700 border-solid rounded-md max-w-xs"
    >
      <div className="flex justify-center mb-5 w-64 ">
        {nightEarthState ? (
          <h2
            className="cursor-pointer w-full flex justify-center"
            onClick={earthThemeButton}
          >
            <span className="w-1/4 text-center border border-transparent  border-solid rounded-md pt-1 pb-1 pl-2 pr-2">
              Day
            </span>
            <span
              className="w-1/4 text-center border border-blue-700 border-solid rounded-md 
          bg-blue-500 bg-opacity-40 pt-1 pb-1 pl-2 pr-2"
            >
              Night
            </span>
          </h2>
        ) : (
          <h2
            className="cursor-pointer w-full flex justify-center"
            onClick={earthThemeButton}
          >
            <span
              className="w-1/4 text-center border border-blue-700 border-solid rounded-md 
              bg-blue-500 bg-opacity-40 pt-1 pb-1 pl-2 pr-2"
            >
              Day
            </span>{" "}
            <span className="w-1/4 text-center border border-transparent  border-solid  pt-1 pb-1 pl-2 pr-2">
              Night
            </span>
          </h2>
        )}
      </div>
      {countryFetched && (
        <>
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <img
                src={countryFetched.flags.png}
                alt={countryFetched.flags.alt}
                className="w-20 h-100% "
              />
              <div className=" flex flex-wrap justify-center">
                <h1 className="ml-4 text-2xl uppercase text-center">
                  {countryFetched.name.common}
                </h1>
                <h3 className="ml-1 text-sm pt-2">({countryFetched.cca3})</h3>
              </div>
            </div>
            <h2 className="pb-2">
              <span className="text-blue-500">Capital: </span>{" "}
              {countryFetched.capital[0]}
            </h2>
            <h2 className="pb-2">
              <span className="text-blue-500">Population: </span>
              {countryFetched.population}
            </h2>
            <h2 className="pb-2">
              <span className="text-blue-500">Independent: </span>
              {countryFetched.independent ? "Sim" : "Não"}
            </h2>
            <ul className="pb-2">
              {Object.entries(countryFetched.currencies || {}).map(
                ([key, value], index) => (
                  <li key={key}>
                    <span className="text-blue-500">Currency: </span>
                    {value.symbol} {value.name}
                  </li>
                )
              )}
            </ul>
            <div className="flex items-top pb-2">
              {Object.keys(countryFetched.continents).length > 1 ? (
                <h2 className="text-blue-500">Continents: &nbsp; </h2>
              ) : (
                <h2 className="text-blue-500">Continent: &nbsp; </h2>
              )}
              <ul>
                {countryFetched.continents.map((continent, index) => (
                  <li key={index} className="flex items-center ">
                    {countryFetched.continents.length > 1 ? (
                      <h2 className="text-blue-500"> {index + 1}. &nbsp; </h2>
                    ) : null}
                    <h2> {continent}</h2>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`flex ${
                Object.keys(countryFetched.languages).length > 1
                  ? "flex-col"
                  : "flex-row "
              } items-start pb-2`}
            >
              {Object.keys(countryFetched.languages).length > 1 ? (
                <h2 className="text-blue-500">Languages: </h2>
              ) : (
                <h2 className="text-blue-500">Language: </h2>
              )}

              <ul className=" flex flex-wrap items-start  w-full">
                {Object.entries(countryFetched.languages || {}).map(
                  ([key, value], index) => (
                    <li key={key} className="flex items-top w-1/2">
                      {Object.keys(countryFetched.languages).length > 1 ? (
                        <h2 className="text-blue-500 ">{index + 1}.</h2>
                      ) : null}
                      <h2 className="h-full"> &nbsp;{value}</h2>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="flex justify-center pt-2">
              <img
                src={countryFetched.coatOfArms.png}
                className="w-20 h-100% mb-4"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
