import { get } from "../../api/client";

const BASE_PATH = "/hsn-tsn";

export interface Manufacturer {
  name: string;
  logo: string;
}

export interface Model {
  name: string;
}

export interface Vehicle {
  manufacturer: string;
  manufacturerLogo: string;
  hsn: string;
  tsn: string;
  name: string;
  body: string;
  fuel: string;
  engineDisplacement: number;
  enginePowerInKW: number;
  enginePowerInHP: number;
}

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
  return get<Vehicle>(`${BASE_PATH}/${hsn.toUpperCase()}/${tsn.toUpperCase()}`);
}
