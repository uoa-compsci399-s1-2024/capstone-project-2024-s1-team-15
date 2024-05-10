import ContentEditor from "@/app/(cms)/components/ContentEditor"
import { Article, ArticleType, IArticle } from "@aapc/types"
import React, { useEffect, useMemo, useState } from "react"
import ArticlePage from "@/app/components/ArticlePage"
import { ArticleOut, Nullable } from "@/app/lib/types"
import { editNews, publishExternalNews } from "@/app/services/news"
import { editResearch, publishResearch } from "@/app/services/research"
import { useAuth } from "@/app/lib/hooks"
import { useRouter } from "next/navigation"
import { act } from "react-dom/test-utils"


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
            media: [],
        }
        switch (articleType) {
            case ArticleType.news_external: {
                switch (actionType) {
                    case "publish": {
                        publishExternalNews(a, { token }).then(r => {
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
        const e: HTMLTextAreaElement = document.getElementById("title-input")! as HTMLTextAreaElement
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
                    id={"title-input"}
                    className={"form-input"}
                    placeholder={"Enter title here... (required)"}
                    defaultValue={title}
                    onChange={updateTitle}
                />
            </div>

            <div>
                <p className={"form-label"}>External</p>
                <input 
                    id={"link-input"}
                    className={"form-input"}
                    placeholder={"Enter External link here...(required) "}
                    defaultValue={externalLink}
                    onChange={updateExternalLink}
                />
            </div>

            <div>
                <button className={"button text-lg"} onClick={submitArticle}>
                    {actionType === "edit" ? "Edit" : "Publish"}&nbsp;
                    {articleType === ArticleType.news_external ? "External News" : "External Research"}
                    
                </button>
            </div>

            { error && <span>{error}</span> }

        </div>
        
           
    )



}