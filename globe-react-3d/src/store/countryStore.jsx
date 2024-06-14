import { create } from "zustand";

const CountryStore = create((set) => ({
  country: "",
  addCountryStore: (newCountry) => set({ country: newCountry }),
}));

export default CountryStore;
