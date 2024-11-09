import  create  from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { store } from "../store";
import { immer } from "zustand/middleware/immer";
import { UserStore } from "../../types/user.types";

export const useUserStore = create<UserStore>(
  persist(
    immer((set) => ({
      user: null,
      logs: [],
      session: null,
      setSession: (session: null) => set({ session }),
      setUser: (user: null) => set({ user }),
    })),
    {
      name: "user-storage",
      storage: createJSONStorage(() => store),
    },
  ) as any,
);
