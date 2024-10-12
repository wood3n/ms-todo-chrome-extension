import type { User } from "@microsoft/microsoft-graph-types";
import { create } from "zustand";

import { getUser, getUserAvatar } from "@/api";

export interface UserInfo extends User {
  /** avatar url */
  avatar?: string;
}

export interface UserState {
  user: UserInfo;
  fetchUser: () => Promise<void>;
}

export const useUser = create<UserState>()(set => ({
  user: {},
  fetchUser: async () => {
    const user = await getUser();

    const avatarBlob = await getUserAvatar();

    const url = URL.createObjectURL(avatarBlob);

    const userInfo = {
      ...user,
      avatar: url,
    };

    set({ user: userInfo });
  },
}));
