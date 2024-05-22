import React from "react"
import DOMPurify from "isomorphic-dompurify"
import parse from "html-react-parser"
import { IArticle } from "@aapc/types"

type ArticlePageProps = { article: IArticle, preview?: boolean }

export default function ArticlePage({ article, preview }: ArticlePageProps): React.JSX.Element {
    preview = preview ?? false
    const cleanHtmlString = DOMPurify.sanitize(article.content, { USE_PROFILES: { html: true } })
    const html = parse(cleanHtmlString)
    const hasSubtitle = article.subtitle !== ""

    return (
        <article className={`prose-sm md:prose prose-slate max-w-full ${preview? "mt-2" : "mt-8"}`}>
            <h1 className={hasSubtitle ? "mb-4" : "mb-10"}>{article.title}</h1>
            <div className="flex items-center justify-between mb-10">
                {hasSubtitle ? <span className={"subtitle"}>{article.subtitle}</span> : null}
                <p>
                    By <a href={`/profile/${article.publisher.username}`}>{article.publisher.displayName}</a>
                </p>
            </div>
            {article.content && html}
        </article>
    )
}
