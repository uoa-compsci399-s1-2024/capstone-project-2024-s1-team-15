import React from "react"
import { ArticleType } from "@aapc/types"
import { notFound } from "next/navigation"
import { getResearchById } from "@/app/services/research"
import ArticleForm from "@/app/(cms)/(articles)/components/ArticleForm"
import { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import ExternalArticleForm from "../../../components/ExternalArticleForm"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard";

export const metadata: Metadata = getMetadata("Edit Research")

export default async function EditResearchPage({ params }: { params: { id: string } }) {
    const article = await getResearchById(params.id)
    if (!article) notFound()

    return (
        <div>
            <h1 className={"page-title"}>Edit Research Article</h1>
            {article &&
                <div className={"mb-6"}>
                    <p className={"form-label"}>Currently Editing</p>
                    <div className={"max-w-[540px]"}>
                        <ArticleCard articleJSON={JSON.stringify(article)}/>
                    </div>
                </div>
            }
            {article.articleType === ArticleType.research_external &&
                <ExternalArticleForm
                    articleType={ArticleType.research_external}
                    articleJSONString={JSON.stringify(article)}
                    actionType={"edit"}
                />
            }
            {article.articleType === ArticleType.research &&
                <ArticleForm
                    articleType={ArticleType.research}
                    articleJSONString={JSON.stringify(article)}
                    actionType={"edit"}
                />
            }
        </div>
    )
}
