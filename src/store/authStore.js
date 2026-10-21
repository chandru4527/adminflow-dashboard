import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(persist((set) => ({
    user: null,

    setAuth: (user) => set({
        user: {
            name: user.name ?? "",
            email: user.email ?? "",
            profileImage: user.profileImage ?? "",
            role: user.role ?? "user",
            isAuthenticated: user.isAuthenticated ?? true,
            isActive: user.isActive ?? true,
        },
    }),

    logout: () => set({ user: null }),
}),
    {
        name: "AdminFlow",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ user: state.user }),
    }
)
);

export default useAuthStore;