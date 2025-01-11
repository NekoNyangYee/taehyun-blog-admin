import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen">
            <div className="pt-[90px]">
                {children}
            </div>
        </div>
    );
}