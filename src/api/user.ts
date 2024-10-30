import type { User } from "@microsoft/microsoft-graph-types";

import http from "./request";

/** 获取用户信息 */
export const getUser = () => http.get<User>("/me");

/** 获取用户头像 */
export function getUserAvatar() {
  return http.get<Blob>("/me/photos/96x96/$value", {
    responseType: "blob",
  });
}
