"use client"

import React from "react";
import LogoIcon from "./icons/LogoIcon";

export default function Header({ session }: { session: any }) {
    return (
        <>
            <div className="flex items-center w-full justify-between p-container border-b border-b-slate-containerColor backdrop-blur-md fixed">
                <LogoIcon />
                <img
                    src={session?.user?.profile}
                    alt={session?.user?.name}
                    className="w-profileImage h-profileImage rounded-full"
                />
            </div>

        </>
    );
}   