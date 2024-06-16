import http from "./request";

import type { User } from "@microsoft/microsoft-graph-types";

/** 获取用户信息 */
export const getUser = () => http.get<User>("/me");

/** 获取用户头像 */
export const getUserAvatar = () =>
	http.get<Blob>("/me/photo/$value", {
		responseType: "blob",
	});
