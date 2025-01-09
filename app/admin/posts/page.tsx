"use client";

import React from "react";
import withSessionCheck from "@components/components/withSessionCheck";

function PostPage() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col flex-1">
                <h1>posts</h1>
            </div>
        </div>
    );
}

export default withSessionCheck(PostPage);