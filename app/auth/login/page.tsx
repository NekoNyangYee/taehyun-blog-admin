"use client";

import { supabase } from "@components/lib/supabaseClient";
import { newAddAdmin } from "@components/lib/util/loginUtil";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter(); // useRouter 사용
    const redirectUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://taehyun-blog-admin.vercel.app";

    const handleSocialLogin = async (provider: "google" | "kakao") => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${redirectUrl}/admin/dashboard`, // 로그인 후 리다이렉트 URL
                },
            });

            if (error) {
                console.error("로그인 에러:", error.message);
                alert("로그인 실패. 다시 시도해주세요.");
                return;
            }

            // 로그인 후 사용자 데이터 삽입/업데이트
            const { data: sessionData } = await supabase.auth.getSession();
            if (sessionData?.session) {
                const userData = sessionData.session.user;

                const userDataSession = {
                    id: userData.id,
                    name: userData.user_metadata?.full_name || "Unknown User",
                    profile: userData.user_metadata?.avatar_url || "",
                    email: userData.email || "",
                    provider: userData.app_metadata?.provider as "google" | "kakao" || "google",
                };

                await newAddAdmin(userDataSession);

                // 로그인 성공 후 /admin/dashboard로 이동
                router.push("/admin/dashboard");
            }
        } catch (err) {
            console.error("handleSocialLogin 에러:", err);
            alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col gap-10 border border-slate-containerColor p-container rounded-container w-full max-w-[572px] m-auto">
                <div className="flex flex-col gap-2 justify-center">
                    <h1 className="font-bold text-xl">관리자 로그인</h1>
                    <p className="m-0 text-sm text-slate-500">Taehyun Blog의 관리자 페이지 입니다.<br />관리자만 로그인해주세요.</p>
                </div>
                <div className="w-full flex justify-center gap-2 flex-col">
                    <button
                        className="flex justify-center gap-2 border border-slate-containerColor bg-google p-button rounded-button"
                        onClick={() => handleSocialLogin("google")}
                    >
                        <Image src="/google-logo.png" alt="google" width={24} height={24} />
                        구글로 로그인
                    </button>
                    <button
                        className="flex justify-center gap-2 bg-kakao p-button rounded-button"
                        onClick={() => handleSocialLogin("kakao")}
                    >
                        <Image src="/kakao-logo.png" alt="kakao" width={24} height={24} />
                        카카오로 로그인
                    </button>
                </div>
            </div>
        </div>
    );
}
