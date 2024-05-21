import React from "react"
import { ArticleType, IArticle } from "@aapc/types"
import Link from "next/link"

export default function ArticleCard({ article }: { article: IArticle }): React.JSX.Element {
    return (
        <Link
            href={`/${article.articleType === ArticleType.news ? "news" : "research"}/${article.id}`}
            className={"block text-black"}>
            <div className={"w-full flex-col flex"}>
                <h4>{article.title}</h4>
                <p className={"font-light tracking-tight text-gray-400 italic"}>{article.subtitle}</p>
                <p className={"mt-1.5 text-md font-light"}>
                    Published by <b>{article.publisher.displayName}</b> on{" "}
                    <b>
                        {new Date(article.publishedAt).toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </b>
                </p>
            </div>
        </Link>
    )
}
