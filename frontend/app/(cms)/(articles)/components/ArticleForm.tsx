"use client"

import ContentEditor from "@/app/(cms)/components/ContentEditor"
import { Article, ArticleType, IArticle } from "@aapc/types"
import React, { useEffect, useMemo, useState } from "react"
import ArticlePage from "@/app/components/ArticlePage"
import { ArticleOut, Nullable } from "@/app/lib/types"
import { editNews, publishNews } from "@/app/services/news"
import { editResearch, publishResearch } from "@/app/services/research"
import { useAuth } from "@/app/lib/hooks"
import { useRouter } from "next/navigation"

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

export default function ArticleForm({ actionType, articleType, articleJSONString }: ArticleFormProps) {
    const router = useRouter()
    const { token } = useAuth()
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState( "")
    const [initialEditorContent, setInitialEditorContent] = useState("")
    const [editorContent, setEditorContent] = useState("")
    const [error, setError] = useState<Nullable<string>>(null)

    const article = useMemo(
        () => articleJSONString ? new Article(JSON.parse(articleJSONString)) : null,
        [articleJSONString]
    )

    useEffect(() => {
        if (article) {
            setTitle(article.title)
            setSubtitle(article.subtitle)
            setEditorContent(article.content)
            setInitialEditorContent(article.content)
        }
    }, [article])

    const submitArticle = () => {
        const a: ArticleOut = {
            title: title,
            subtitle: subtitle,
            content: editorContent,
            media: [],
        }
        switch (articleType) {
            case ArticleType.news: {
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
            case ArticleType.research: {
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
        const e: HTMLTextAreaElement = document.getElementById("title-input")! as HTMLTextAreaElement
        setTitle(e.value)
    }

    const updateSubtitle = () => {
        const e: HTMLTextAreaElement = document.getElementById("subtitle-input")! as HTMLTextAreaElement
        setSubtitle(e.value)
    }

    return (
        <div className={"space-y-6"}>
            <div>
                <p className={"form-label"}>Title</p>
                <input
                    id={"title-input"}
                    className={"form-input"}
                    onChange={updateTitle}
                    placeholder={"Enter title here... (required)"}
                    defaultValue={title}
                />
            </div>

            <div>
                <p className={"form-label"}>Subtitle</p>
                <input
                    id={"subtitle-input"}
                    className={"form-input pb-1"}
                    onChange={updateSubtitle}
                    placeholder={"Enter subtitle here... (optional)"}
                    defaultValue={subtitle}
                />
            </div>

            <div>
                <p className={"form-label"}>Content</p>
                <ContentEditor setEditorContent={setEditorContent} content={initialEditorContent}/>
            </div>

            <div>
                <button className={"button text-lg"} onClick={submitArticle}>
                    {actionType === "edit" ? "Edit" : "Publish"}&nbsp;
                    {articleType === ArticleType.news ? "News" : "Research"}
                </button>
            </div>

            { error && <span>{error}</span> }

            <div>
                <p className={"form-label"}>Article Preview</p>
                <div className={"p-6 rounded-2xl border-dotted border-2 border-black border-opacity-30"}>
                    <ArticlePage
                        article={new Article({ title: title, subtitle: subtitle, content: editorContent })}
                        preview
                    />
                </div>
            </div>
        </div>
    )
}
