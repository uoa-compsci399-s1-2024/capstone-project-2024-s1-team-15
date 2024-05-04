"use client"

import React from "react"
import { ArticleType } from "@aapc/types"
import { notFound } from "next/navigation"
import { getResearchById } from "@/app/services/research"
import ArticleForm from "@/app/(cms)/(articles)/components/ArticleForm"

export default async function EditResearchPage({ params }: { params: { id: string } }) {
    const article = await getResearchById(params.id)
    if (!article) notFound()

    return (
        <div>
            <h1>Editing Research {params.id}</h1>
            <ArticleForm articleType={ArticleType.research} article={article} actionType={"edit"}/>
        </div>
    )
}
