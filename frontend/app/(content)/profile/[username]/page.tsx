"use client"

import React, { useEffect, useState } from "react"
import { getResearch } from "@/app/services/research"
import { getNews } from "@/app/services/news"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard"

import SearchBar from "@/app/components/SearchBar"
import { Article, IPaginator, IUser } from "@aapc/types"
import { Nullable } from "@/app/lib/types";
import DisplayIcon from "@/app/components/DisplayIcon";

type PageParams = { params: { username: string } }

export default function ArticlesCreatedByUserPage({ params }: PageParams) {
    const username = params.username

    const [user, setUser] = useState<Nullable<IUser>>(null)

    const [news, setNews] = useState<Nullable<IPaginator<Article>>>(null)
    const [newsSearchInput, setNewsSearchInput] = useState<string | undefined>(undefined)

    const [research, setResearch] = useState<Nullable<IPaginator<Article>>>(null)
    const [researchSearchInput, setResearchSearchInput] = useState<string | undefined>(undefined)

    useEffect(() => {
        getNews(username, newsSearchInput).then((news) => {
            setNews(news)
            if (news.data.length === 0) return
            setUser(news.data[0].publisher)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, newsSearchInput])

    useEffect(() => {
        getResearch(username, researchSearchInput).then((research) => {
            setResearch(research)
            if (research.data.length === 0) return
            setUser(research.data[0].publisher)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, researchSearchInput])

    return (user &&
        <div className={"space-y-6"}>
            <div className={"flex flex-row items-center mt-6 gap-x-8"}>
                <DisplayIcon src={user.iconSrc} displayName={user.displayName} nextSize={512} className={"h-40 w-40 shadow-xl"}/>
                <div>
                    <h1 className={"my-0"}>{user.displayName}</h1>
                    <p className={"text-gray-500"}>@{user.username}</p>
                </div>
            </div>

            <div>
                <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 flex flex-col md:flex-row">
                    <h2>News Articles</h2>
                    {(news?.totalResults || research?.totalResults || newsSearchInput) && (
                        <SearchBar onSearchInputChange={setNewsSearchInput}/>
                    )}
                </div>
                {news?.totalResults
                    ? <div className={"space-y-6"}>
                        {news?.data.map((a) => <ArticleCard articleJSON={JSON.stringify(a)} key={a.id}/>)}
                    </div>
                    : newsSearchInput
                        ? <p>No articles found. Try searching something else!</p>
                        : <p>{user.displayName} hasn&apos;t published any news articles.</p>
                }
            </div>

            <div>
                <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 flex flex-col md:flex-row">
                    <h2>Research Articles</h2>
                    {(news?.totalResults || research?.totalResults || researchSearchInput) && (
                        <SearchBar onSearchInputChange={setResearchSearchInput}/>
                    )}
                </div>
                {research?.totalResults
                    ? <div className={"space-y-6"}>
                        {research?.data.map((a) => <ArticleCard articleJSON={JSON.stringify(a)} key={a.id}/>)}
                    </div>
                    : researchSearchInput
                        ? <p>No articles found. Try searching something else!</p>
                        : <p>{user.displayName} hasn&apos;t published any research articles.</p>
                }
            </div>
        </div>
    )
}
