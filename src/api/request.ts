import { toast } from "react-toastify";

import type { AxiosError } from "axios";
import axios from "axios";

import { acquireToken } from "@/auth/ms-oauth";

declare module "axios" {

  // https://github.com/axios/axios/issues/1510#issuecomment-525382535
  export interface AxiosInstance {
    request<T = unknown>(config: AxiosRequestConfig): Promise<T>;
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
    put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
    patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  }
}

/**
 * https://learn.microsoft.com/zh-cn/graph/use-the-api
 */
const http = axios.create({
  baseURL: "https://graph.microsoft.com/v1.0",
});

http.interceptors.request.use(
  async (config) => {
    const res = await acquireToken();

    if (res?.accessToken) {
      config.headers.Authorization = `Bearer ${res.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use((response) => {
  return response.data;
}, (error: AxiosError) => {
  // @ts-ignore
  if (error.response?.data && error.response.data.error) {
    // @ts-ignore
    toast.error(error.response.data.error?.innerError?.code || "Invalid request");
  }
  return Promise.reject(error);
});

export default http;
