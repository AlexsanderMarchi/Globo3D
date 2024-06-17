import { create } from "zustand";

const CountryStore = create((set) => ({
  countryName: "",
  countryFetched: "",
  addCountryStore: (newCountry) => set({ countryName: newCountry }),
  countryFetchedStore: (newCountryData) =>
    set({ countryFetched: newCountryData }),
}));

export default CountryStore;
