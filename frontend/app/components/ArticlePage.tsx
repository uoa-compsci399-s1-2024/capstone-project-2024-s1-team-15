import React from "react"
import DOMPurify from "isomorphic-dompurify"
import parse from "html-react-parser"
import { IArticle } from "@aapc/types"

type ArticlePageProps = { article: IArticle, preview?: boolean }

export default function ArticlePage({ article, preview = false }: ArticlePageProps): React.JSX.Element {
    const cleanHtmlString = DOMPurify.sanitize(article.content, { USE_PROFILES: { html: true } })
    const html = parse(cleanHtmlString)
    const hasSubtitle = article.subtitle !== ""

    return (
        <article className={`max-w-full ${preview? "mt-2" : "mt-8"}`}>
            <h1 className={`${hasSubtitle ? "mb-6" : "mb-10"} leading-none`}>{article.title}</h1>

            {hasSubtitle &&
                <span className={"italic text-2xl text-gray-400 mb-10 block"}>{article.subtitle}</span>
            }

            <div className={"prose-sm md:prose prose-slate"}>
                {article.content && html}
            </div>
        </article>
    )
}
