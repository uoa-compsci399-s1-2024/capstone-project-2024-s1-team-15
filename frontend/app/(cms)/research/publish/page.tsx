"use client"

import React from "react";
import ArticleForm from "@/app/components/ArticleForm";
import { ArticleType } from "@aapc/types";

export default function CreateResearchPage() {
    return (
        <div>
            <h1>Publish a Research Article</h1>
            <ArticleForm articleType={ArticleType.research} actionType={"create"} />
        </div>
    )
}
