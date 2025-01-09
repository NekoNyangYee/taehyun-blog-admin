"use client";

import React from "react";
import LogoIcon from "./icons/LogoIcon";
import { Session } from "@supabase/supabase-js";
import Image from "next/image";

interface HeaderProps {
    session: Session | null | undefined; // session은 선택적 prop으로 설정
}

export default function Header({ session }: HeaderProps) {
    return (
        <>
            <div className="flex items-center w-full justify-between p-container border-b border-b-slate-containerColor backdrop-blur-md fixed">
                <LogoIcon />
                <Image
                    src={session?.user?.user_metadata?.avatar_url || null}
                    alt="user"
                    className="rounded-full"
                    width={34}
                    height={34}
                />
            </div>

        </>
    );
}