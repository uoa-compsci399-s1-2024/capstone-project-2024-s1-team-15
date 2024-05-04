"use client"

import React from "react"
import { ArticleType } from "@aapc/types"
import { notFound } from "next/navigation"
import { getNewsById } from "@/app/services/news"
import ArticleForm from "@/app/(cms)/(articles)/components/ArticleForm"

export default async function EditNewsPage({ params }: { params: { id: string } }) {
    const article = await getNewsById(params.id)
    if (!article) notFound()

    return (
        <div>
            <h1>Editing News {params.id}</h1>
            <ArticleForm articleType={ArticleType.news} article={article} actionType={"edit"}/>
        </div>
    )
}
