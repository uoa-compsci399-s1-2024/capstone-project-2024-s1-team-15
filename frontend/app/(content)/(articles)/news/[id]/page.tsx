import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNewsById } from "@/app/services/news"
import { getMetadata } from "@/app/lib/util"
import { ArticleType } from "@aapc/types"
import { SCOPES } from "@/app/lib/consts"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import DeleteArticleButton from "@/app/(cms)/(articles)/components/DeleteArticleButton"
import icons from "@/app/lib/icons"
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
        <div className={"space-y-12"}>
            {article.articleType == ArticleType.news &&
                <ArticlePage preview={false} article={article}/>
            }
            <Privileged requiredScopes={SCOPES.maintainer}>
                <div className="flex flex-row space-x-6">
                    <ButtonLink theme={"cms"} href={`/news/${params.id}/edit`} text={"Edit Article"} icon={icons.edit}/>
                    <DeleteArticleButton articleJSON={JSON.stringify(article)}/>
                </div>
            </Privileged>
        </div>
    )
}
