import type { User } from "@microsoft/microsoft-graph-types";
import { create } from "zustand";

import { getUser, getUserAvatar } from "@/api";

export interface UserInfo extends User {
  /** avatar url */
  avatar?: string;
}

export interface UserState {
  user: UserInfo | null;
  fetchUser: () => Promise<void>;
}

export const useUser = create<UserState>()(set => ({
  user: null,
  fetchUser: async () => {
    const user = await getUser();

    const avatarBlob = await getUserAvatar();

    const url = window.URL.createObjectURL(avatarBlob);

    const userInfo = {
      ...user,
      avatar: url,
    };

    set({ user: userInfo });
  },
}));
