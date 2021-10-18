import { get } from "./client";
import { Manufacturer, Model, Vehicle } from "../app/domain";

export async function getManufacturers(): Promise<Manufacturer[]> {
  return get<Manufacturer[]>("/hsn-tsn/manufacturers");
}

export async function getModelsByManufacturerName(
  manufacturerName: string
): Promise<Model[]> {
  return get<Model[]>(`/hsn-tsn/manufacturers/${manufacturerName}/models`);
}

export async function getVehiclesByManufacturerNameAndModelName(
  manufacturerName: string,
  modelName: string
): Promise<Vehicle[]> {
  return get<Vehicle[]>(
    `/hsn-tsn/manufacturers/${manufacturerName}/models/${modelName}/vehicles`
  );
}

export async function getVehicleByHsnAndTsn(
  hsn: string,
  tsn: string
): Promise<Vehicle> {
  return get<Vehicle>(`/hsn-tsn/${hsn}/${tsn}`);
}
