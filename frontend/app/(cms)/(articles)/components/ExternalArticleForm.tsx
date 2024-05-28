"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Article, ArticleType, IArticle } from "@aapc/types"
import { ArticleOut, Nullable } from "@/app/lib/types"
import { editNews, publishNews } from "@/app/services/news"
import { editResearch, publishResearch } from "@/app/services/research"
import { useAuth } from "@/app/lib/hooks"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons";

type ArticleFormProps = PublishArticleFormProps | EditArticleFormProps

type PublishArticleFormProps = {
    actionType: "publish"
    articleType: ArticleType
    articleJSONString?: string
}

type EditArticleFormProps = {
    actionType: "edit"
    articleType: ArticleType
    articleJSONString: string
}

export default function ExternalArticleForm({ actionType, articleType, articleJSONString }: ArticleFormProps){
    const router = useRouter()
    const { token } = useAuth()
    const [title, setTitle] = useState("")
    const [externalLink, setExternalLink] = useState("")
    const [error, setError] = useState<Nullable<string>>(null)

    const article = useMemo(
        () => articleJSONString ? new Article(JSON.parse(articleJSONString)) : null,
        [articleJSONString]
    )

    useEffect(() => {
        if (article) {
            setTitle(article.title)
            setExternalLink(article.content)
        }
    }, [article])

    const submitArticle = () => {
        const a: ArticleOut = {
            title: title,
            content: externalLink,
            articleType: articleType,
            media: [],
        }
        switch (articleType) {
            case ArticleType.news_external: {
                switch (actionType) {
                    case "publish": {
                        publishNews(a, { token }).then(r => {
                            if (r.success) {
                                setError(null)
                                router.push(`/news/${r.result.id}`)
                            } else {
                                setError(r.message)
                            }
                        })
                    } break
                    case "edit": {
                        editNews((article as IArticle).id, a, { token }).then(r => {
                            if (r.success) {
                                setError(null)
                                router.push(`/news/${r.result.id}`)
                            } else {
                                setError(r.message)
                            }
                        })
                    } break
                }
            } break
            case ArticleType.research_external: {
                switch (actionType) {
                    case "publish": {
                        publishResearch(a, { token }).then(r => {
                            if (r.success) {
                                setError(null)
                                router.push(`/research/${r.result.id}`)
                            } else {
                                setError(r.message)
                            }
                        })
                    } break
                    case "edit": {
                        editResearch((article as IArticle).id, a, { token }).then(r => {
                            if (r.success) {
                                setError(null)
                                router.push(`/research/${r.result.id}`)
                            } else {
                                setError(r.message)
                            }
                        })
                    } break
                }

            } break
        }
    }

    const updateTitle = () => {
        const e: HTMLTextAreaElement = document.getElementById("external-title-input")! as HTMLTextAreaElement
        setTitle(e.value)
    }

    const updateExternalLink = () => {
        const e: HTMLTextAreaElement = document.getElementById("link-input")! as HTMLTextAreaElement
        setExternalLink(e.value)
    }
    

    return(
        <div className={"space-y-6"}>
            <div>
                <p className={"form-label"}>Title</p>
                <input
                    id={"external-title-input"}
                    className={"form-input"}
                    placeholder={"Enter title here... (required)"}
                    defaultValue={title}
                    onChange={updateTitle}
                />
            </div>

            <div>
                <p className={"form-label"}>External Link</p>
                <input 
                    id={"link-input"}
                    className={"form-input"}
                    placeholder={"Enter link to an external article here...(required) "}
                    defaultValue={externalLink}
                    onChange={updateExternalLink}
                />
            </div>

            <div>
                <Button
                    onClick={submitArticle}
                    text={`${actionType === "edit" ? "Edit" : "Publish"} External ${articleType === ArticleType.news_external ? "News" : "Research"}`}
                    icon={icons.add}
                />
            </div>

            { error && <span>{error}</span> }
        </div>
    )
}