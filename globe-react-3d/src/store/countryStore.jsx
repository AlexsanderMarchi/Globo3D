import { create } from "zustand";

const CountryStore = create((set) => ({
  countryName: "",
  countryFetched: "",
  countryImages: [],
  addCountryStore: (newCountry) => set({ countryName: newCountry }),
  countryImageStore: (newCountryImages) =>
    set({ countryImages: newCountryImages }),
  countryFetchedStore: (newCountryData) =>
    set({ countryFetched: newCountryData }),
}));

export default CountryStore;
