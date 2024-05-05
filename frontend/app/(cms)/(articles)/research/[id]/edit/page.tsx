import React from "react"
import { ArticleType } from "@aapc/types"
import { notFound } from "next/navigation"
import { getResearchById } from "@/app/services/research"
import ArticleForm from "@/app/(cms)/(articles)/components/ArticleForm"
import { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"

export const metadata: Metadata = getMetadata("Edit Research")

export default async function EditResearchPage({ params }: { params: { id: string } }) {
    const article = await getResearchById(params.id)
    if (!article) notFound()

    return (
        <div>
            <h1>Editing Research ID <span className={"font-mono ml-2"}>{params.id}</span></h1>
            <ArticleForm articleType={ArticleType.research} articleJSONString={JSON.stringify(article)} actionType={"edit"}/>
        </div>
    )
}
