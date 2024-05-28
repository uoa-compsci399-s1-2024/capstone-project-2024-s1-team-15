import React from "react"
import { ArticleType } from "@aapc/types"
import { notFound } from "next/navigation"
import { getNewsById } from "@/app/services/news"
import ArticleForm from "@/app/(cms)/(articles)/components/ArticleForm"
import ExternalArticleForm from "@/app/(cms)/(articles)/components/ExternalArticleForm"
import { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard";

export const metadata: Metadata = getMetadata("Edit News")

export default async function EditNewsPage({ params }: { params: { id: string } }) {
    const article = await getNewsById(params.id)
    if (!article) notFound()

    return (
        <div>
            <h1 className={"page-title"}>Edit News Article</h1>
            {article &&
                <div className={"mb-6"}>
                    <p className={"form-label"}>Currently Editing</p>
                    <div className={"max-w-[540px]"}>
                        <ArticleCard articleJSON={JSON.stringify(article)}/>
                    </div>
                </div>
            }
            {article.articleType === ArticleType.news_external &&
                <ExternalArticleForm
                    articleType={ArticleType.news_external}
                    articleJSONString={JSON.stringify(article)}
                    actionType={"edit"}
                />
            }
            {article.articleType === ArticleType.news &&
                <ArticleForm
                    articleType={ArticleType.news}
                    articleJSONString={JSON.stringify(article)}
                    actionType={"edit"}
                />
            }
        </div>
    )
}
