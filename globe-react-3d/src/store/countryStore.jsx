import { create } from "zustand";

const CountryStore = create((set, get) => ({
  countryName: "",
  countryFetched: "",
  addCountryStore: (newCountry) => set({ countryName: newCountry }),
  countryFetchedStore: (newCountryData) => {
    if (newCountryData.length > 0) {
      if (
        newCountryData[0].name.common ===
          "United States Minor Outlying Islands" ||
        newCountryData[0].name.common === "British Indian Ocean Territory"
      ) {
        set({ countryFetched: newCountryData[1] });
      } else {
        set({ countryFetched: newCountryData[0] });
      }
    } else {
      set({ countryFetched: newCountryData });
    }
  },
}));

export default CountryStore;
