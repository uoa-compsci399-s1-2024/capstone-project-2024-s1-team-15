import React from "react"
import DOMPurify from "isomorphic-dompurify"
import parse from "html-react-parser"
import { IArticle } from "@aapc/types"

export function ArticleFromCMS({ article }: { article: IArticle }): React.JSX.Element {
    const cleanHtmlString = DOMPurify.sanitize(article.content, { USE_PROFILES: { html: true } })
    const html = parse(cleanHtmlString)
    const hasSubtitle = article.subtitle !== ""

    return (
        <article className={"prose prose-slate max-w-max"}>
            <h1 className={hasSubtitle ? "mb-3" : "mb-10"}>{article.title}</h1>
            {hasSubtitle ? <span className={"subtitle"}>{article.subtitle}</span> : null}
            {article.content && html}
        </article>
    )
}
