"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@components/lib/supabaseClient";
import { useAuthStore } from "@components/app/store/authStore";
import Navbar from "@components/components/Navbar";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, session, login, logout } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const checkSessionAndAdmin = async () => {
      try {
        setIsLoading(true);

        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session) {
          const { data: userData } = await supabase.auth.getUser();

          if (userData?.user) {
            const userDataSession: User = userData.user;

            const dataSession = {
              access_token: sessionData.session.access_token,
              refresh_token: sessionData.session.refresh_token,
              expires_in: sessionData.session.expires_in,
              token_type: sessionData.session.token_type, // token_type 추가
            } as const;

            login(userDataSession, dataSession);

            const { data: isAdminData, error } = await supabase
              .from("profiles")
              .select("is_admin")
              .eq("id", userData.user.id)
              .single();

            if (error || !isAdminData?.is_admin) {
              alert("관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.");
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
        console.error("세션 확인 중 에러:", err);
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

  useEffect(() => {
    console.log("Session:", session); // session 객체 구조 확인
  }, [session]);

  if (isLoading || !isAuthorized) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="pt-[67px] flex">
        <div className="fixed top-[67px] left-0 w-[240px] h-[calc(100vh-67px)] p-container border-r border-slate-containerColor">
          <Navbar />
        </div>
        <div className="ml-[250px] flex-1 p-4">
          <h1 className="text-3xl font-bold">Home</h1>
          <p>Home 페이지 입니다.</p>
        </div>
      </div>
    </div>
  );
}
