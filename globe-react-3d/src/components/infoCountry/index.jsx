import React, { useEffect, useState } from "react";
import CountryStore from "../../store/countryStore";
import NightEarthStore from "../../store/nightEarthStore";

export default function InfoCountry() {
  const { countryFetched } = CountryStore();
  const { nightEarthState } = NightEarthStore(); //ADD A BUTTOM IN THE INFO TO CHANGE EARTH THEME
  const [exceptionCountry, setExceptionCountry] = useState(false);

  //SEE THE INDIAN DATA
  useEffect(() => {
    if (
      countryFetched[0].name.common === "United States Minor Outlying Islands"
    ) {
      setExceptionCountry(countryFetched[0]);
    } else {
      setExceptionCountry(countryFetched[1]);
    }
  }, [countryFetched]);

  //Have to test button
  const earthThemeButton = (event) => {
    if (nightEarthState) {
      NightEarthStore.getState().changeBoolean(true);
    } else {
      NightEarthStore.getState().changeBoolean(false);
    }
  };

  return (
    <div
      class="absolute top-0 left-0 p-4 bg-black bg-opacity-40 text-white border 
      border-blue-700 border-solid rounded-md max-w-xs"
    >
      {/* Have to test button */}
      <button onClick={earthThemeButton}> CLICK TO CHANGE EARTH THEME</button>
      {countryFetched.length > 0 && (
        <>
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <img
                src={exceptionCountry.flags.png}
                alt={exceptionCountry.flags.alt}
                className="w-20 h-100% "
              />
              <div className=" flex flex-wrap justify-center">
                <h1 className="ml-4 text-2xl uppercase text-center">
                  {exceptionCountry.name.common}
                </h1>
                <h3 className="ml-1 text-sm pt-2">({exceptionCountry.cca3})</h3>
              </div>
            </div>
            <h2 className="pb-2">
              <span className="text-blue-500">Capital: </span>{" "}
              {exceptionCountry.capital[0]}
            </h2>
            <h2 className="pb-2">
              <span className="text-blue-500">Population: </span>
              {exceptionCountry.population}
            </h2>
            <h2 className="pb-2">
              <span className="text-blue-500">Independent: </span>
              {exceptionCountry.independent ? "Sim" : "Não"}
            </h2>
            <ul className="pb-2">
              {Object.entries(exceptionCountry.currencies || {}).map(
                ([key, value], index) => (
                  <li key={key}>
                    <span className="text-blue-500">Currency: </span>
                    {value.symbol} {value.name}
                  </li>
                )
              )}
            </ul>
            <div className="flex items-top pb-2">
              {Object.keys(exceptionCountry.continents).length > 1 ? (
                <h2 className="text-blue-500">Continents: &nbsp; </h2>
              ) : (
                <h2 className="text-blue-500">Continent: &nbsp; </h2>
              )}
              <ul>
                {exceptionCountry.continents.map((continent, index) => (
                  <li key={index} className="flex items-center ">
                    {exceptionCountry.continents.length > 1 ? (
                      <h2 className="text-blue-500"> {index + 1}. &nbsp; </h2>
                    ) : null}
                    <h2> {continent}</h2>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`flex ${
                Object.keys(exceptionCountry.languages).length > 1
                  ? "flex-col"
                  : "flex-row "
              } items-start pb-2`}
            >
              {Object.keys(exceptionCountry.languages).length > 1 ? (
                <h2 className="text-blue-500">Languages: </h2>
              ) : (
                <h2 className="text-blue-500">Language: </h2>
              )}

              <ul className=" flex flex-wrap items-start  w-full">
                {Object.entries(exceptionCountry.languages || {}).map(
                  ([key, value], index) => (
                    <li key={key} className="flex items-top w-1/2">
                      {Object.keys(exceptionCountry.languages).length > 1 ? (
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
                src={exceptionCountry.coatOfArms.png}
                className="w-20 h-100% mb-4"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
