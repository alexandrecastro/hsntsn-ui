import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getManufacturers,
  getModelsByManufacturerName,
  getVehicleByHsnAndTsn,
  getVehiclesByManufacturerNameAndModelName,
  Manufacturer,
  Model,
  Vehicle,
} from "./searchAPI";
import { RootState } from "../../app/store";

// STATE

export interface SearchState {
  status: "IDLE" | "LOADING" | "FAILED";
  manufacturers: Manufacturer[];
  models: Model[];
  vehicles: Vehicle[];
  selectedVehicle?: Vehicle;
}

const initialState: SearchState = {
  status: "IDLE",
  manufacturers: [],
  models: [],
  vehicles: [],
  selectedVehicle: undefined,
};

// THUNKS

export const fetchManufacturers = createAsyncThunk(
  "search/fetchManufacturers",
  async () => {
    return getManufacturers();
  }
);

export const fetchModels = createAsyncThunk(
  "search/fetchModels",
  async (payload: { manufacturerName: string }) => {
    return getModelsByManufacturerName(payload.manufacturerName);
  }
);

export const fetchVehicles = createAsyncThunk(
  "search/fetchVehicles",
  async (payload: { manufacturerName: string; modelName: string }) => {
    return getVehiclesByManufacturerNameAndModelName(
      payload.manufacturerName,
      payload.modelName
    );
  }
);

export const fetchVehicle = createAsyncThunk(
  "search/fetchVehicle",
  async (payload: { hsn: string; tsn: string }) => {
    return getVehicleByHsnAndTsn(payload.hsn, payload.tsn);
  }
);

// SLICE

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    chooseVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.selectedVehicle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManufacturers.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.manufacturers = action.payload;
        state.models = [];
        state.vehicles = [];
      })
      .addCase(fetchModels.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.models = action.payload;
        state.vehicles = [];
      })
      .addCase(fetchVehicles.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicle.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchVehicle.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.selectedVehicle = action.payload;
      });
  },
});

// ACTIONS

export const { chooseVehicle } = searchSlice.actions;

// SELECTORS

export const selectManufacturers = (state: RootState) =>
  state.search.manufacturers;

export const selectModels = (state: RootState) => state.search.models;

export const selectVehicles = (state: RootState) => state.search.vehicles;

export const selectSelectedVehicle = (state: RootState) =>
  state.search.selectedVehicle;

export default searchSlice.reducer;
