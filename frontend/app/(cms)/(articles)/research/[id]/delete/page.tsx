import React from "react"
import { ArticleType } from "@aapc/types"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import DeleteButton from "../../../components/DeleteButton"
import ButtonLink from "@/app/components/ButtonLink"
import { getResearchById } from "@/app/services/research"


export const metadata: Metadata = getMetadata("Delete Research")

export default async function DeleteResearchPage({ params }: { params: { id: string } }) {
    const article = await getResearchById(params.id)
    if (!article) notFound()

    return (
        <div>
            <h2>Are you sure you want to delete Research ID: <span className={"font-mono ml-2"}>{article.id}</span> </h2>
            <div className="flex flex-row space-x-4">
                <DeleteButton text="Delete" articleType={article.articleType} articleId={article.id}/>
                <ButtonLink href={`/research/${params.id}`} text={"Go Back"}/>
            </div>
            
        </div>
    )
}
