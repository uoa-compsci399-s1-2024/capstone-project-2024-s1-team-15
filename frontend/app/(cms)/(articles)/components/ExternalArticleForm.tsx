"use client"

import React, { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Article, ArticleType, IArticle } from "@aapc/types"
import { ArticleOut, Nullable } from "@/app/lib/types"
import { editNews, publishNews } from "@/app/services/news"
import { editResearch, publishResearch } from "@/app/services/research"
import { useAuth } from "@/app/lib/hooks"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import DeleteArticleButton from "@/app/(cms)/(articles)/components/DeleteArticleButton"
import ButtonLink from "@/app/components/ButtonLink"
import { DEFAULT_FORM_DIALOG_DURATION } from "@/app/lib/consts"

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

    const [error, setError] = useState<Nullable<string>>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [_, setCurrentTimeout] = useState<Nullable<NodeJS.Timeout>>(null)

    const article = useMemo(
        () => articleJSONString ? new Article(JSON.parse(articleJSONString)) : null,
        [articleJSONString]
    )

    const handleSubmitSuccess = () => {
        setError(null)
        setSuccess(true)
        setCurrentTimeout(c => {
            if (c) clearTimeout(c)
            return setTimeout(
                () => setSuccess(false),
                DEFAULT_FORM_DIALOG_DURATION
            )
        })
    }

    const submitArticle = () => {
        const title = (document.getElementById("external-title") as HTMLInputElement).value
        const link = (document.getElementById("link") as HTMLInputElement).value
        if (title === "") {
            setError("You must enter a title.")
            return
        }
        if (link === "") {
            setError("You must enter a link.")
            return
        } else {
            // checks link is valid url
            const expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/
            if (!link.match(expr)) {
                setError("Link must be a valid URL.")
                return
            }
        }
        const a: ArticleOut = {
            title: title,
            content: link,
            articleType: articleType
        }
        switch (articleType) {
            case ArticleType.news_external: {
                switch (actionType) {
                    case "publish": {
                        publishNews(a, { token }).then(r => {
                            if (r.success) {
                                handleSubmitSuccess()
                                setTimeout(() => router.push(`/news`), 2500)
                            }
                            else setError(r.message)
                        })
                    } break
                    case "edit": {
                        editNews((article as IArticle).id, a, { token }).then(r => {
                            if (r.success) handleSubmitSuccess()
                            else setError(r.message)
                        })
                    } break
                }
            } break
            case ArticleType.research_external: {
                switch (actionType) {
                    case "publish": {
                        publishResearch(a, { token }).then(r => {
                            if (r.success) {
                                handleSubmitSuccess()
                                setTimeout(() => router.push(`/research`), 2500)
                            } else setError(r.message)
                        })
                    } break
                    case "edit": {
                        editResearch((article as IArticle).id, a, { token }).then(r => {
                            if (r.success) handleSubmitSuccess()
                            else setError(r.message)
                        })
                    }
                }
            }
        }
    }

    return (
        <div className={"space-y-6"}>
            <div>
                <label className={"form-label"} htmlFor={"external-title"}>Title</label>
                <input
                    id={"external-title"}
                    name={"title"}
                    className={"form-input"}
                    placeholder={"Enter title here... (required)"}
                    defaultValue={article?.title}
                    required
                />
            </div>

            <div>
                <label className={"form-label"} htmlFor={"link"}>External Link</label>
                <input 
                    id={"link"}
                    name={"link"}
                    className={"form-input"}
                    placeholder={"https://... (required) "}
                    defaultValue={article?.content}
                    required
                />
            </div>

            <div className={"flex flex-row gap-x-6"}>
                {actionType === "edit" && article &&
                    // Go back to all articles page, as external articles no longer have their own page
                    <ButtonLink
                        href={`/${article.articleType === ArticleType.news_external
                            ? "news"
                            : "research"
                        }`}
                        text={"Back"}
                        icon={icons.back}
                        theme={"secondary"}
                        leftIcon
                    />
                }

                <Button
                    onClick={submitArticle}
                    theme={"cms-green"}
                    text={`${actionType === "edit" ? "Edit" : "Publish"}`}
                    icon={actionType === "publish" ? icons.add : icons.edit}
                />

                {actionType === "edit" &&
                    <DeleteArticleButton articleJSON={articleJSONString} onError={e => setError(e)}/>
                }
            </div>

            {error && <p className={"form-error"}>{error}</p>}
            {success && <p className={"form-success"}>
                {actionType === "edit"
                    ? "External article has been successfully edited."
                    : "External article has been successfully published. Redirecting..."
                }
                </p>
            }
        </div>
    )
}