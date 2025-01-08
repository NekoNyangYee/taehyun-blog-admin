"use client";

import { supabase } from "@components/lib/supabaseClient";
import Image from "next/image";

export default function LoginPage() {
    const handleSocialLogin = async (provider: "google" | "kakao") => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider });

            if (error) {
                console.log("로그인 에러:", error.message);
                alert("로그인 실패. 다시 시도해주세요.");
                return;
            }

        } catch (err) {
            console.log("handleSocialLogin 에러:", err);
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
                        <Image src="/google-logo.png" alt="kakao" width={24} height={24} />
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
