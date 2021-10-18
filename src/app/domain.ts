export interface Manufacturer {
  name: string;
  logo: string;
}

export interface Model {
  name: string;
}

export interface Vehicle {
  hsn: string;
  tsn: string;
  name: string;
  body: string;
  fuel: string;
  engineDisplacement: number;
  enginePowerInKW: number;
  enginePowerInHP: number;
}
