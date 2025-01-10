"use client";

import React, { useEffect, useState } from "react";
import LogoIcon from "./icons/LogoIcon";
import { supabase } from "@components/lib/supabaseClient";
import Image from "next/image";
import { Session } from "@supabase/supabase-js";

export default function Header() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };

        fetchSession();

        // 세션 변경 이벤트 감지
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        return () => {
            subscription?.subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="flex items-center w-full justify-between p-container border-b border-b-slate-containerColor backdrop-blur-md fixed">
            <LogoIcon />
            {session?.user?.user_metadata?.avatar_url ? (
                <Image
                    src={session.user.user_metadata.avatar_url}
                    alt="user"
                    className="rounded-full"
                    width={34}
                    height={34}
                />
            ) : (
                <div className="w-[34px] h-[34px] bg-gray-300 rounded-full" />
            )}
        </div>
    );
}