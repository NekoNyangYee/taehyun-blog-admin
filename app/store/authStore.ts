import { create } from "zustand";

type Session = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

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
    login: (user: AuthStore["user"], session: AuthStore["session"]) => void; //AuthStore["user"]: user의 타입을 AuthStore의 user로 정의, session도 이하 동일
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    user: null,
    session: null,
    storeSession: (session) => set({ session }),
    clearSession: () => set({ session: null }),
    login: (user, session) => set({ isAuthenticated: true, user, session }),
    logout: () => set({ isAuthenticated: false, user: null, session: null }),
}));