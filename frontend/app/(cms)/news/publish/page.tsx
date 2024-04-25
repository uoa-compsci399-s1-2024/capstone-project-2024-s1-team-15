"use client"

import React from "react"
import ArticleForm from "@/app/components/ArticleForm"
import { ArticleType } from "@aapc/types"
import ButtonLink from "@/app/components/ButtonLink"

export default function CreateNewsPage() {
    return (
        <div>
            <h1>Publish a News Article</h1>
            <ButtonLink href={"/news/publish/example"} text={"Demonstration Example"} />
            <ArticleForm articleType={ArticleType.news} actionType={"create"} />
        </div>
    )
}
