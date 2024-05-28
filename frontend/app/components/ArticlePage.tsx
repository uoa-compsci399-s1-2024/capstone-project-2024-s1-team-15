import React from "react"
import DOMPurify from "isomorphic-dompurify"
import parse from "html-react-parser"
import { IArticle, IUser } from "@aapc/types"
import LinkUser from "@/app/components/LinkUser"

type ArticlePageProps = {
    preview: false
    article: IArticle
} | {
    preview: true
    article: IArticle
    user: IUser
}

export default function ArticlePage(props: ArticlePageProps): React.JSX.Element {
    const article = props.article
    const user = props.preview ? props.user : article.publisher

    const isPreview = props.preview
    const hasSubtitle = article.subtitle !== ""

    const cleanHtmlString = DOMPurify.sanitize(article.content, { USE_PROFILES: { html: true } })
    const html = parse(cleanHtmlString)

    return (
        <article className={`max-w-full ${isPreview ? "mt-2" : "mt-8"}`}>
            <h1 className={`${hasSubtitle ? "mb-6" : "mb-10"} leading-none mt-0`}>{article.title}</h1>
            {hasSubtitle && <p className={"italic text-2xl text-gray-400 block mb-6"}>{article.subtitle}</p>}
            <div className={"flex flex-col sm:flex-row sm:items-center mb-14 gap-x-1 gap-y-1"}>
                <p className={"hidden md:inline"}>Published by</p>
                <LinkUser user={user}/>
                <p>
                    <span className={"hidden sm:inline"}>on </span>
                    {new Date(article.publishedAt).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                })}</p>
            </div>
            <div className={"prose"}>{article.content && html}</div>
        </article>
    )
}
