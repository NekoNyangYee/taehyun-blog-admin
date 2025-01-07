"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@components/lib/supabaseClient";
import { useAuthStore } from "@components/app/store/authStore";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, session, login, logout } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        const { data: userData } = await supabase.auth.getUser();

        if (userData.user) {
          // Zustand에 세션 및 유저 정보 저장
          login(
            {
              id: userData.user.id,
              name: userData.user.user_metadata?.full_name || "Unknown User",
              email: userData.user.email || "Unknown Email",
              profile: userData.user.user_metadata?.avatar_url || "",
              provider: "google", // 또는 "kakao"
            },
            {
              access_token: sessionData.session.access_token,
              refresh_token: sessionData.session.refresh_token,
              expires_in: sessionData.session.expires_in,
            }
          );
        }
      } else {
        router.push("/auth/login");
      }
    };

    if (!isAuthenticated) {
      checkSession();
    }
  }, [isAuthenticated, login, router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    logout();
    router.push("/auth/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <img
        src={session?.user?.profile}
        alt={session?.user?.name}
        style={{ maxWidth: "100px", maxHeight: "100px" }} // 크기를 명시적으로 설정
      />

      <p>Welcome, {session?.user?.name}!</p>
      <button
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}
