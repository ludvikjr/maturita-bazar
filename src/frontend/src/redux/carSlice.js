import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state
 */
const initialState = {
  filters: {},
  filteredCars: [],
  filtered: false,
  cats: {
    types: [],
    brands: [],
    colors: [],
    transmissions: [],
  },
  page: 0,
};

export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setFilters: (state, filters) => {
      state.filters = filters.payload;
    },
    toggleFilters: (state, action) => {
      switch (action.payload) {
        case "DISABLE":
          state.filtered = false;
          console.log("Filters disabled");
          break;
        case "ENABLE":
          state.filtered = true;
          console.log("Filters enabled");
          break;
        default:
          console.log("Invalid action");
          break;
      }
    },
    setFilteredCars: (state, cars) => {
      state.filteredCars = cars.payload;
    },
    setPage: (state, page) => {
      state.page = page.payload;
    },
  },
});

export const { setFilters, toggleFilters, setFilteredCars, setPage } =
  carSlice.actions;

export default carSlice.reducer;
