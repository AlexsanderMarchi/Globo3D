import { create } from "zustand";

const CountryStore = create((set) => ({
  countryName: "",
  countryFetched: "",
  countryImages: [],
  addCountryStore: (newCountry) => set({ countryName: newCountry }),
  countryImageStore: (newCountryImages) =>
    set({ countryImages: newCountryImages }),
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
