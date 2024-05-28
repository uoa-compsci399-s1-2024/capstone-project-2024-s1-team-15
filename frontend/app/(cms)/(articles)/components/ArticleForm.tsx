"use client"

import ContentEditor from "@/app/(cms)/components/ContentEditor"
import { Article, ArticleType, IArticle, User } from "@aapc/types"
import React, { useEffect, useMemo, useState } from "react"
import ArticlePage from "@/app/components/ArticlePage"
import { ArticleOut, Nullable } from "@/app/lib/types"
import { editNews, publishNews } from "@/app/services/news"
import { editResearch, publishResearch } from "@/app/services/research"
import { useAuth } from "@/app/lib/hooks"
import { useRouter } from "next/navigation"
import Button from "@/app/components/Button";
import icons from "@/app/lib/icons";
import DeleteArticleButton from "@/app/(cms)/(articles)/components/DeleteArticleButton";
import ButtonLink from "@/app/components/ButtonLink";

type ArticleFormProps = {
    actionType: "publish"
    articleType: ArticleType
    articleJSONString?: string
} | {
    actionType: "edit"
    articleType: ArticleType
    articleJSONString: string
}

export default function ArticleForm({ actionType, articleType, articleJSONString }: ArticleFormProps) {
    const router = useRouter()
    const { token, user } = useAuth()
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
        if (!title || title === "") {
            setError("You must enter a title for your article.")
            return
        }
        const a: ArticleOut = {
            title: title,
            subtitle: subtitle,
            content: editorContent,
            articleType: articleType,
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
        const e: HTMLInputElement = document.getElementById("title") as HTMLInputElement
        setTitle(e.value)
    }

    const updateSubtitle = () => {
        const e: HTMLInputElement = document.getElementById("subtitle") as HTMLInputElement
        setSubtitle(e.value)
    }

    return (
        <div className={"space-y-6"}>
            <div>
                <label className={"form-label"} htmlFor={"title"}>Title</label>
                <input
                    id={"title"}
                    name={"title"}
                    className={"form-input"}
                    onChange={updateTitle}
                    placeholder={"Enter title here... (required)"}
                    defaultValue={title}
                    required={true}
                />
            </div>

            <div>
                <label className={"form-label"} htmlFor={"subtitle"}>Subtitle</label>
                <input
                    id={"subtitle"}
                    name={"subtitle"}
                    className={"form-input"}
                    onChange={updateSubtitle}
                    placeholder={"Enter subtitle here... (optional)"}
                    defaultValue={subtitle}
                />
            </div>

            <div>
                <p className={"form-label"}>Content</p>
                <ContentEditor setEditorContent={setEditorContent} initialContent={initialEditorContent}/>
            </div>

            {error && <p className={"form-error"}>{error}</p>}

            <div className={"flex flex-row gap-x-6"}>
                {actionType === "edit" && article &&
                    <ButtonLink
                        href={`/${article.articleType === ArticleType.news
                            ? "news"
                            : "research"
                            }/${article.id}
                        `}
                        text={"Back"}
                        icon={icons.back}
                        theme={"secondary"}
                        leftIcon
                    />
                }

                <Button
                    onClick={submitArticle}
                    theme={"cms-green"}
                    text={`${ actionType === "edit" ? "Edit" : "Publish"}`}
                    icon={actionType === "publish" ? icons.add : icons.edit}
                />

                {actionType === "edit" &&
                    <DeleteArticleButton articleJSON={articleJSONString} onError={e => setError(e)}/>
                }
            </div>

            <div>
                <p className={"form-label"}>Article Preview</p>
                <div className={"p-6 rounded-2xl border-dotted border-2 border-black border-opacity-30"}>
                    <ArticlePage
                        article={new Article({ ...article,
                            title: title,
                            subtitle: subtitle,
                            content: editorContent
                        })}
                        user={user || new User()}
                        preview={true}
                    />
                </div>
            </div>
        </div>
    )
}
