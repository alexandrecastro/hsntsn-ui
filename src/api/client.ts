import axios, { AxiosInstance, AxiosResponse } from "axios";

function buildAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

const instance = buildAxiosInstance();

async function request<T>(endpoint: string, data?: {}): Promise<T> {
  const response: AxiosResponse<T> = data
    ? await instance.post(endpoint, data)
    : await instance.get(endpoint);
  return response.data;
}

export async function get<T>(endpoint: string): Promise<T> {
  return request(endpoint);
}

export async function post<T>(endpoint: string, data?: {}): Promise<T> {
  return request(endpoint, data);
}
