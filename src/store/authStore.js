import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (data) =>
        set({ token: data.token, user: data.user, isAuthenticated: true }),
      logout: () => {
        localStorage.removeItem("auth-storage");
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
