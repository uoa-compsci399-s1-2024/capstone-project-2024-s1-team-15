import React from "react"
import { SCOPES } from "@/app/lib/consts"
import { getMetadata } from "@/app/lib/util"
import { getAllNews } from "@/app/services/news"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import Pagination from "@/app/components/Paginations"
import SearchBar from "@/app/components/SearchBar"

export const metadata = getMetadata("All News")

export default async function AllNewsPage() {
    const news = await getAllNews()

    return (
        <>
            <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
                <h1 className="page-title">All News</h1>
                <SearchBar />
            </div>

            <Privileged requiredScopes={SCOPES.maintainer}>
                <ButtonLink href={"/news/publish"} text={"Publish News"} />
            </Privileged>
            <div className={"space-y-12 mt-6"}>
                {news.data.map((a) => {
                    return <ArticleCard article={a} key={a.id} />
                })}
            </div>
            <Pagination />
        </>
    )
}
