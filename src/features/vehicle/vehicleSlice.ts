import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getManufacturers,
  getModelsByManufacturerName,
  getVehiclesByManufacturerNameAndModelName,
} from "../../api/hsn-tsn";
import { Manufacturer, Model, Vehicle } from "../../app/domain";

export interface VehicleState {
  status: "IDLE" | "LOADING" | "FAILED";
  selectedManufacturer: string;
  selectedModel: string;
  selectedVehicle: string;
  manufacturers: Manufacturer[];
  models: Model[];
  vehicles: Vehicle[];
}

const initialState: VehicleState = {
  status: "IDLE",
  selectedManufacturer: "",
  selectedModel: "",
  selectedVehicle: "",
  manufacturers: [],
  models: [],
  vehicles: [],
};

export const loadManufacturers = createAsyncThunk(
  "vehicle/loadManufacturers",
  async () => {
    return await getManufacturers();
  }
);

export const loadModels = createAsyncThunk(
  "vehicle/loadModels",
  async (manufacturerName: string) => {
    return await getModelsByManufacturerName(manufacturerName);
  }
);

export const loadVehicles = createAsyncThunk(
  "vehicle/loadVehicles",
  async (model: { manufacturerName: string; modelName: string }) => {
    return await getVehiclesByManufacturerNameAndModelName(
      model.manufacturerName,
      model.modelName
    );
  }
);

export const loadVehicle = createAsyncThunk(
  "vehicle/loadVehicle",
  async (vehicle: Vehicle) => {
    return vehicle;
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    onSelectedVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.selectedVehicle = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadManufacturers.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(loadManufacturers.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.manufacturers = action.payload;
        state.models = [];
        state.vehicles = [];
      })
      .addCase(loadModels.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(loadModels.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.models = action.payload;
        state.vehicles = [];
      })
      .addCase(loadVehicles.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(loadVehicles.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.vehicles = action.payload;
      });
  },
});

export const { onSelectedVehicle } = vehicleSlice.actions;

export const selectManufacturers = (state: RootState) =>
  state.vehicle.manufacturers;

export const selectModels = (state: RootState) => state.vehicle.models;

export const selectVehicles = (state: RootState) => state.vehicle.vehicles;

export default vehicleSlice.reducer;
