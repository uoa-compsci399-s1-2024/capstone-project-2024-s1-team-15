import React from "react"
import { ArticleType } from "@aapc/types"
import { notFound } from "next/navigation"
import { getNewsById } from "@/app/services/news"
import { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import DeleteButton from "../../../components/DeleteButton"
import ButtonLink from "@/app/components/ButtonLink"


export const metadata: Metadata = getMetadata("Delete News")

export default async function DeleteNewsPage({ params }: { params: { id: string } }) {
    const article = await getNewsById(params.id)
    if (!article) notFound()

    return (
        <div>
            <h2>Are you sure you want to delete News ID: <span className={"font-mono ml-2"}>{article.id}</span> </h2>
            <div className="flex flex-row space-x-4">
                <DeleteButton text="Delete" articleType={article.articleType} articleId={article.id}/>
                <ButtonLink href={`/news/${params.id}`} text={"Go Back"}/>
            </div>
            
        </div>
    )
}
