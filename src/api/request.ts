import { acquireToken } from "@/auth/ms-oauth";
import axios from "axios";

declare module "axios" {
  /**
   * 自定义配置参数
   */
  export interface AxiosRequestConfig {
    /**
     * 即时更新
     */
    useTimeStamp?: boolean;
  }

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
  timeout: 10000,
});

http.interceptors.request.use(
  async (config) => {
    const accessToken = await acquireToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    else {
      throw new Error(`Can't get accessToken`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(response => response.data);

export default http;
