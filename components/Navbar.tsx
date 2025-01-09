"use client";

import Link from "next/link";
import { useAuthStore } from "@components/app/store/authStore";
import { useComponentStore } from "@components/app/store/componentStore";
import { supabase } from "@components/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const { logout } = useAuthStore();
    const { activeButtonIndex, updateActiveButtonIndex } = useComponentStore();

    const navButton = [
        { label: "대시보드", path: "/" },
        { label: "포스트", path: "/admin/posts" },
        { label: "댓글", path: "/admin/comments" },
        { label: "카테고리", path: "/admin/categories" },
    ];

    const logoutHandler = async () => {
        await supabase.auth.signOut();
        logout();
        router.push("/auth/login");
    };

    return (
        <div className="flex flex-col gap-4 h-full justify-between">
            {/* 네비게이션 버튼 */}
            <div className="flex flex-col items-center gap-2">
                {navButton.map((button, index) => (
                    <Link
                        key={index}
                        href={button.path}
                        onClick={() => updateActiveButtonIndex(index)} // 상태 업데이트
                        className={`w-full p-button rounded-button text-left transition 
                            ${activeButtonIndex === index
                                ? "bg-navButton text-white"
                                : "bg-white text-gray-700"
                            }
                        `}
                    >
                        {button.label}
                    </Link>
                ))}
            </div>
            {/* 로그아웃 버튼 */}
            <button
                onClick={logoutHandler}
                className="w-full p-button border border-slate-logoutColor rounded-button"
            >
                로그아웃
            </button>
        </div>
    );
}