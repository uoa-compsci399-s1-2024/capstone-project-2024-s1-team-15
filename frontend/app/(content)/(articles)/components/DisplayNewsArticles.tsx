"use client"

import SearchBar from "@/app/components/SearchBar"
import { ArticleType } from "@aapc/types"
import { useEffect, useState } from "react"
import ArticleCard from "../components/ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import { SCOPES } from "@/app/lib/consts"
import icons from "@/app/lib/icons"
import { getAllNews } from "@/app/services/news"
import ExternalArticleCard from "../components/ExternalArticleCard"
import React from "react"
import Paginator from "@/app/components/Paginator"
import { IArticle } from "@aapc/types"

export default function DisplayNewsArticles() {
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [news, setNews] = useState<IArticle[]>([])

    useEffect(() => {
        getAllNews(searchTerm, page).then((result) => {
            setNews(result.data)
            setLastPage(result.lastPage)
        })
    }, [page, searchTerm])

    return (
        <>
            <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <ButtonLink theme={"cms"} href={"/news/publish"} text={"Publish News"} icon={icons.add} />
                </Privileged>
                <SearchBar onSearchInputChange={setSearchTerm} />
            </div>
            <div className={"space-y-12 mt-6"}>
                {news.length ? (
                    news?.map((a) => {
                        if (a.articleType === ArticleType.news) {
                            return <ArticleCard article={a} key={a.id} />
                        }
                        return <ExternalArticleCard article={a} key={a.id} />
                    })
                ) : searchTerm ? (
                    <p>There are no news articles with &apos;{searchTerm}&apos; in the title.</p>
                ) : (
                    <p>There are no news articles.</p>
                )}
                <Paginator currentPage={page} setCurrentPage={setPage} lastPage={lastPage} />
            </div>
        </>
    )
}
