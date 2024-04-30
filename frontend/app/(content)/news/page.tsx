import React from "react"
import { Article, Paginator } from "@aapc/types"
import { API_URI } from "@/app/consts"
import ArticleCard from "@/app/components/ArticleCard"
import ButtonLink from "@/app/components/ButtonLink"
import { getMetadata } from "@/app/util"

export const metadata = getMetadata("All News")

export default async function AllNewsPage() {
    const news = new Paginator(
        Article,
        await (await fetch(API_URI + "/content/news?pp=1000", { method: "get" })).json()
    )
    const newsCards: React.JSX.Element[] = []
    for (const a of news.data) {
        newsCards.push(<ArticleCard article={a} key={a.id} />)
    }

    return (
        <div>
            <h1>All News</h1>
            <div className={"my-8"}>
                <ButtonLink href={"/news/publish"} text={"Publish News"} />
            </div>
            <div className={"space-y-12"}>{newsCards}</div>
        </div>
    )
}
