import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getResearchById } from "@/app/services/research"
import { getMetadata } from "@/app/lib/util"
import { SCOPES } from "@/app/lib/consts"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import icons from "@/app/lib/icons";
import ArticlePage from "@/app/components/ArticlePage"

type PageParams = { params: { id: string } }

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const article = await getResearchById(params.id)
    return getMetadata(article?.title)
}

export default async function ResearchPage({ params }: PageParams) {
    const article = await getResearchById(params.id)
    if (!article) notFound()

    return (
        <div className={"space-y-6"}>
            <ArticlePage preview={false} article={article} />
            <Privileged requiredScopes={SCOPES.maintainer}>
                <ButtonLink theme={"cms"} href={`/research/${params.id}/edit`} text={"Edit Article"} icon={icons.edit}/>
            </Privileged>
        </div>
    )
}
