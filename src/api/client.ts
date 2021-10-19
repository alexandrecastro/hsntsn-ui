import axios, { AxiosInstance, AxiosResponse } from "axios";

const APPLICATION_JSON = "application/json";

function buildAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: "http://localhost:8080", // TODO process.env.API_URL,
    headers: {
      Accept: APPLICATION_JSON,
      "Content-Type": APPLICATION_JSON,
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
