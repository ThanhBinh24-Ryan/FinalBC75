import { create } from "zustand";
import { User } from "../types/User.type";

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  removeUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
