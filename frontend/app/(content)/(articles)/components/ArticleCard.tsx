import React from "react"
import { ArticleType, IArticle } from "@aapc/types"
import Link from "next/link"
import User from "@/app/components/User"

export default function ArticleCard({ article }: { article: IArticle }): React.JSX.Element {
    return (
        <Link
            href={`/${[ArticleType.news, ArticleType.news_external].includes(article.articleType) ? "news" : "research"}/${article.id}`}
            className={`block text-black hover:bg-black hover:bg-opacity-5 transition
                px-3 py-2 rounded-lg
                sm:px-4 sm:py-2.5 sm:rounded-xl
                md:px-5 md:py-3 md:rounded-2xl 
            `}>
            <div className={"w-full flex-col flex"}>
                <h5 className={"leading-tight"}>{article.title}</h5>
                {article.subtitle !== "" &&
                    <p className={"font-light tracking-tight text-gray-400 italic smaller mt-1"}>{article.subtitle}</p>
                }
                <div className={"mt-2 font-light flex-row flex-wrap flex items-center gap-x-1"}>
                    <User user={article.publisher} size={"small"}/>
                    <div>
                        <p className={"smallest text-gray-500 block"}>
                            {new Date(article.publishedAt).toLocaleDateString("en-us", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
