import { create } from "zustand";

const NightEarthStore = create((set) => ({
  nightEarthState: false,
  changeBoolean: (newBoolean) => set({ nightEarthState: newBoolean }),
}));

export default NightEarthStore;
