"use client";

import Link from "next/link";
import { useAuthStore } from "@components/app/store/authStore";
import { useComponentStore } from "@components/app/store/componentStore";
import { supabase } from "@components/lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname(); // 현재 URL 경로를 가져옴
    const { logout } = useAuthStore();
    const { activeButtonIndex, updateActiveButtonIndex } = useComponentStore();

    const navButton = [
        { label: "대시보드", path: "/admin/dashboard" },
        { label: "포스트", path: "/admin/posts" },
        { label: "댓글", path: "/admin/comments" },
        { label: "카테고리", path: "/admin/categories" },
    ];

    const logoutHandler = async () => {
        await supabase.auth.signOut();
        logout();
        router.push("/auth/login");
    };

    // 현재 URL 경로에 따라 activeButtonIndex를 설정
    useEffect(() => {
        const currentIndex = navButton.findIndex((button) => button.path === pathname);
        if (currentIndex !== -1 && currentIndex !== activeButtonIndex) {
            updateActiveButtonIndex(currentIndex);
        }
    }, [pathname, activeButtonIndex, updateActiveButtonIndex]);

    return (
        <div className="flex flex-col gap-4 h-full justify-between">
            {/* 네비게이션 버튼 */}
            <div className="flex flex-col items-center gap-2">
                {navButton.map((button, index) => (
                    <Link
                        key={index}
                        href={button.path}
                        onClick={() => updateActiveButtonIndex(index)} // 상태 업데이트
                        className={`w-full p-button rounded-button text-left 
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
