"use client";

import withSessionCheck from "@components/components/withSessionCheck";
import React from "react";

function CommentPage() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col flex-1">
                <h1>Comments</h1>
            </div>
        </div>
    );
}

export default withSessionCheck(CommentPage);