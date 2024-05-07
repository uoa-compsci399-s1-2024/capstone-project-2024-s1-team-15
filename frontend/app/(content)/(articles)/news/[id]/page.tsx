import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNewsById } from "@/app/services/news"
import { getMetadata } from "@/app/lib/util"
import { SCOPES } from "@/app/lib/consts"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import ArticlePage from "@/app/components/ArticlePage"

type PageParams = { params: { id: string } }

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const article = await getNewsById(params.id)
    return getMetadata(article?.title)
}

export default async function NewsPage({ params }: PageParams) {
    const article = await getNewsById(params.id)
    if (!article) notFound()

    return (
        <div className={"space-y-6"}>
            <ArticlePage article={article} />
            <Privileged requiredScopes={SCOPES.maintainer}>
                <ButtonLink href={`/news/${params.id}/edit`} text={"Edit"} />
            </Privileged>
        </div>
    )
}
