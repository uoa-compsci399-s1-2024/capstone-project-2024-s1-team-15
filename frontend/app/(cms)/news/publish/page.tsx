"use client"

import React from "react";
import ArticleForm from "@/app/components/ArticleForm";
import { ArticleType } from "@aapc/types";

export default function CreateNewsPage() {
    return (
        <div>
            <h1>Publish a News Article</h1>
            <ArticleForm articleType={ArticleType.news}/>
        </div>
    )
}
