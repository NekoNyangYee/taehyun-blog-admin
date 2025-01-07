"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@components/lib/supabaseClient";
import { newAddAdmin, checkAdmin } from "@components/lib/util/loginUtil";

export default function LoginPage() {
    const router = useRouter();

    const handleSocialLogin = async (provider: "google" | "kakao") => {
        try {
            console.log("소셜 로그인 시작:", provider);

            // Supabase 소셜 로그인 요청
            const { error } = await supabase.auth.signInWithOAuth({ provider });

            if (error) {
                console.error("로그인 에러:", error.message);
                alert("로그인 실패. 다시 시도해주세요.");
                return;
            }

        } catch (err) {
            console.error("handleSocialLogin 에러:", err);
            alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };



    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={() => handleSocialLogin("google")}>Login with Google</button>
            <button onClick={() => handleSocialLogin("kakao")}>Login with Kakao</button>
        </div>
    );
}
