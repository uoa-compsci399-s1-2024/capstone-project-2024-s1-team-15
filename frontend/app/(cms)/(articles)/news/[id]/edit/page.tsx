import React from "react"
import { ArticleType } from "@aapc/types"
import { notFound } from "next/navigation"
import { getNewsById } from "@/app/services/news"
import ArticleForm from "@/app/(cms)/(articles)/components/ArticleForm"
import { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"

export const metadata: Metadata = getMetadata("Edit News")

export default async function EditNewsPage({ params }: { params: { id: string } }) {
    const article = await getNewsById(params.id)
    if (!article) notFound()

    return (
        <div>
            <h1>Editing News ID <span className={"font-mono ml-2"}>{params.id}</span></h1>
            <ArticleForm articleType={ArticleType.news} articleJSONString={JSON.stringify(article)} actionType={"edit"}/>
        </div>
    )
}