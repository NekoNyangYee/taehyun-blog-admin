import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@supabase/supabase-js";

type Session = {
    user: User;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
};

interface AuthStore {
    isAuthenticated: boolean; // 세션 유효 여부
    user: User | null; // 사용자 정보
    session: Session | null; // 세션 정보
    login: (user: User, session: Omit<Session, 'user'>) => void; // 로그인 처리
    logout: () => void; // 로그아웃 처리
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            session: null,
            login: (user, session) => {
                set({
                    isAuthenticated: true,
                    user,
                    session: { ...session, user },
                });
            },
            logout: () => set({ isAuthenticated: false, user: null, session: null }),
        }),
        { name: "auth-store" } // 상태를 localStorage에 저장
    )
);
