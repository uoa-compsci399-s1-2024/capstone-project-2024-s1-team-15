import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getResearchById } from "@/app/services/research"
import { getMetadata } from "@/app/lib/util"
import { ArticleType } from "@aapc/types"
import { SCOPES } from "@/app/lib/consts"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import ExternalLinkButton from "@/app/(cms)/(articles)/components/ExternalLinkButton"
import DeleteArticleButton from "@/app/(cms)/(articles)/components/DeleteArticleButton"
import icons from "@/app/lib/icons"
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
        <div className={"space-y-12"}>
            {article.articleType === ArticleType.research &&
                <ArticlePage preview={false} article={article}/>
            }

            {article.articleType === ArticleType.research_external &&
                <div className="flex flex-col">
                    <h1>{article.title}</h1>
                    <h2 className="text-red-500">This is an external article. To view it you will have to leave our website</h2>
                    <div className="flex flex-row space-x-4">
                        <ExternalLinkButton url={article.content} text={"Continue"}/>
                        <ButtonLink href={'/research'} text={"Go Back"}/>
                    </div>
                </div>
            }

            <Privileged requiredScopes={SCOPES.maintainer}>
                <div className="flex flex-row space-x-6">
                    <ButtonLink theme={"cms"} href={`/research/${params.id}/edit`} text={"Edit Article"} icon={icons.edit}/>
                    <DeleteArticleButton articleJSON={JSON.stringify(article)}/>
                </div>
            </Privileged>
        </div>
    )
}
