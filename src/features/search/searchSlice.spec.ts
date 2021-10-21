import searchReducer, { SearchState, fetchManufacturers } from "./searchSlice";

describe("search reducer", () => {
  const initialState: SearchState = {
    status: "IDLE",
    manufacturers: [],
    models: [],
    vehicles: [],
    selectedVehicle: undefined,
  };
  it("should handle initial state", () => {
    expect(searchReducer(undefined, { type: "unknown" })).toEqual({
      status: "IDLE",
    });
  });

  it("should handle fetch manufacturers", () => {
    // const actual = searchReducer(initialState, fetchManufacturers());
    // expect(actual.manufacturers).toEqual([]);
  });
});
