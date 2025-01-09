import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col flex-1">
                {children}
            </div>
        </div>
    );
}