import { get } from "./client";
import { Manufacturer, Model, Vehicle } from "../app/domain";

const BASE_PATH = "/hsn-tsn";

export async function getManufacturers(): Promise<Manufacturer[]> {
  return get<Manufacturer[]>(`${BASE_PATH}/manufacturers`);
}

export async function getModelsByManufacturerName(
  manufacturerName: string
): Promise<Model[]> {
  return get<Model[]>(`${BASE_PATH}/manufacturers/${manufacturerName}/models`);
}

export async function getVehiclesByManufacturerNameAndModelName(
  manufacturerName: string,
  modelName: string
): Promise<Vehicle[]> {
  return get<Vehicle[]>(
    `${BASE_PATH}/manufacturers/${manufacturerName}/models/${modelName}/vehicles`
  );
}

export async function getVehicleByHsnAndTsn(
  hsn: string,
  tsn: string
): Promise<Vehicle> {
  return get<Vehicle>(`${BASE_PATH}/${hsn}/${tsn}`);
}
