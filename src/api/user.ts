import request from "./request";

import type { User } from "@microsoft/microsoft-graph-types";

export const getUser = () => request.get<User>("/me");
