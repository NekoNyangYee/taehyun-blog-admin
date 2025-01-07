"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@components/lib/supabaseClient";

export default function LoginPage() {
    const router = useRouter();

    // 사용자가 로그인되어 있으면 홈으로 리다이렉트
    useEffect(() => {
        const checkSession = async () => {
            const { data: session } = await supabase.auth.getSession();

            if (session?.session) {
                router.push("/");
            }
        };

        checkSession();
    }, [router]);

    const handleSocialLogin = async (provider: "google" | "kakao") => {
        const { error } = await supabase.auth.signInWithOAuth({ provider });

        if (error) {
            console.error("로그인 에러:", error.message);
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
