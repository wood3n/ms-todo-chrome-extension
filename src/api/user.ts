import { graphClient } from "./graph-client";

import type { User } from "@microsoft/microsoft-graph-types";

export const getUser = () => graphClient.api("/me").get() as Promise<User>;
