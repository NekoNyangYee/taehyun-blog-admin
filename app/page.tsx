"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@components/lib/supabaseClient";
import { useAuthStore } from "@components/app/store/authStore";
import Header from "@components/components/Header";
import Navbar from "@components/components/Navbar";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, session, login, logout } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false); // 권한 확인 상태

  useEffect(() => {
    const checkSessionAndAdmin = async () => {
      try {
        setIsLoading(true);

        // 세션 데이터 확인
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session) {
          const { data: userData } = await supabase.auth.getUser();

          if (userData?.user) {
            const userDataSession = {
              id: userData.user.id,
              name: userData.user.user_metadata?.full_name || "Unknown User",
              email: userData.user.email || "Unknown Email",
              profile: userData.user.user_metadata?.avatar_url || "",
              provider: "google", // 또는 "kakao"
            } as const;

            const dataSession = {
              access_token: sessionData.session.access_token,
              refresh_token: sessionData.session.refresh_token,
              expires_in: sessionData.session.expires_in,
            } as const;

            login(userDataSession, dataSession);

            const { data: isAdminData, error } = await supabase
              .from("profiles")
              .select("is_admin")
              .eq("id", userData.user.id)
              .single();

            if (error || !isAdminData?.is_admin) {
              alert("해당 계정은 관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.");
              await supabase.auth.signOut();
              logout();
              router.push("/auth/login");
              return;
            }

            setIsAuthorized(true);
          }
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        console.log("세션 확인 중 에러:", err);
        await supabase.auth.signOut();
        logout();
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthenticated) {
      checkSessionAndAdmin();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, login, logout, router]);

  // 로딩 중이거나 권한 확인 중인 경우 화면 차단
  if (isLoading || !isAuthorized) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header session={session} />
      <div className="pt-[67px] flex">
        {/* 네비게이션 바 */}
        <div className="fixed top-[67px] left-0 w-[240px] h-[calc(100vh-67px)] p-container border-r border-slate-containerColor">
          <Navbar />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="ml-[250px] flex-1 p-4">
          <h1 className="text-3xl font-bold">Home</h1>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
          <p>Home 페이지 입니다.</p>
        </div>
      </div>
    </div>
  );
}
