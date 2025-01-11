"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@components/lib/supabaseClient";
import { useAuthStore } from "@components/app/store/authStore";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      try {
        // 세션 확인
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session) {
          // 로그인 상태
          const user = sessionData.session.user;
          if (user) {
            login(user, {
              access_token: sessionData.session.access_token,
              refresh_token: sessionData.session.refresh_token,
              expires_in: sessionData.session.expires_in,
              token_type: sessionData.session.token_type,
            });
            router.push("/admin/dashboard");
          } else {
            throw new Error("유저 정보 없음");
          }
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.log("세션 확인 중 에러:", error);
        logout();
        router.push("/auth/login");
      }
    };

    checkSessionAndRedirect();
  }, [router, login, logout, isAuthenticated]);

  return null; // 리다이렉트만 처리하므로 UI는 필요 없음
}
