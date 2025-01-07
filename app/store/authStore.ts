import { create } from "zustand";

type Session = {
    user: {
        id: string;
        name: string;
        email: string;
        profile: string;
        provider: "google" | "kakao";
    };
    access_token: string;
    refresh_token: string;
    expires_in: number;
};

interface AuthStore {
    isAuthenticated: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        profile: string;
        provider: "google" | "kakao";
    } | null;
    session: Session | null;
    storeSession: (session: Session) => void;
    clearSession: () => void;
    login: (user: AuthStore["user"], session: Omit<Session, 'user'>) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    user: null,
    session: null,
    storeSession: (session) => set({ session }),
    clearSession: () => set({ session: null }),
    login: (user, session) => {
        if (user) {
            set({ isAuthenticated: true, user, session: { ...session, user } });
        }
    },
    logout: () => set({ isAuthenticated: false, user: null, session: null }),
}));
