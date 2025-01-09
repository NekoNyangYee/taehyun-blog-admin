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
    isUserAuthenticated: boolean; // 사용자 인증 상태
    isVerifyingAdmin: boolean; // 관리자 권한 확인 중
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
    setVerifyingAdmin: (verifying: boolean) => void;
    setUserAuthenticated: (authenticated: boolean) => void;
    login: (user: AuthStore["user"], session: Omit<Session, 'user'>) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    isUserAuthenticated: false,
    isVerifyingAdmin: false,
    user: null,
    session: null,
    storeSession: (session) => set({ session }),
    clearSession: () => set({ session: null }),
    setVerifyingAdmin: (verifying) => set({ isVerifyingAdmin: verifying }),
    setUserAuthenticated: (authenticated) => set({ isUserAuthenticated: authenticated }),
    login: (user, session) => {
        if (user) {
            set({ isAuthenticated: true, isUserAuthenticated: true, user, session: { ...session, user } });
        }
    },
    logout: () => set({ isAuthenticated: false, isUserAuthenticated: false, isVerifyingAdmin: false, user: null, session: null }),
}));
