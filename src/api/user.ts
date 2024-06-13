import http from "./request";

import type { User } from "@microsoft/microsoft-graph-types";

export const getUser = () => http.get<User>("/me");

export const getUserAvatar = () =>
	http.get<Blob>("/me/photo/$value", {
		responseType: "blob",
	});
