/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useEffect, useState } from "react"
import { SCOPES } from "@/app/lib/consts"
import { getResearchByUser } from "@/app/services/research"
import { getNewsByUser } from "@/app/services/news"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"

import SearchBar from "@/app/components/SearchBar"
import { Article, IPaginator } from "@aapc/types"

type PageParams = { params: { username: string } }

export default function ArticlesCreatedByUserPage({ params }: PageParams) {
    const username = params.username
    const [usersResearch, setUsersResearch] = useState<IPaginator<Article> | null>(null)
    const [usersNews, setUsersNews] = useState<IPaginator<Article> | null>(null)
    const [titleSearchInput, setTitleSearchInput] = useState("")
    const [displayName, setDisplayName] = useState<null | string>(null)

    useEffect(() => {
        getResearchByUser(username, titleSearchInput).then((research) => {
            setUsersResearch(research)

            if (displayName || !research.totalResults) return
            setDisplayName(research.data[0].publisher.displayName)
        })

        getNewsByUser(username, titleSearchInput).then((news) => {
            setUsersNews(news)

            if (displayName || !news.totalResults) return
            setDisplayName(news.data[0].publisher.displayName)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, titleSearchInput])

    useEffect(() => {
        console.log(titleSearchInput)
    }, [titleSearchInput])

    return (
        <>
            <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
                <h1 className="page-title">Articles by {displayName || username}</h1>
                {usersNews?.totalResults || usersResearch?.totalResults || titleSearchInput ? (
                    <SearchBar onSearchInputChange={setTitleSearchInput} />
                ) : (
                    <></>
                )}
            </div>

            <h2>Research</h2>
            <Privileged requiredScopes={SCOPES.maintainer}>
                <ButtonLink href={"/research/publish"} text={"Publish Research"} />
            </Privileged>

            {usersResearch?.totalResults ? (
                <>
                    <div className={"space-y-12 my-6"}>
                        {usersResearch?.data.map((a) => {
                            return <ArticleCard article={a} key={a.id} />
                        })}
                    </div>
                    <hr />
                </>
            ) : titleSearchInput ? (
                <p>
                    Currently, {displayName} hasn't published research articles with '{titleSearchInput}' in the title.
                </p>
            ) : (
                <p>Currently, {displayName} hasn't published any research articles.</p>
            )}

            <h2 className="mt-14">News</h2>
            <Privileged requiredScopes={SCOPES.maintainer}>
                <ButtonLink href={"/news/publish"} text={"Publish News"} />
            </Privileged>
            {usersNews?.totalResults ? (
                <div className={"space-y-12 mt-6"}>
                    {usersNews?.data.map((a) => {
                        return <ArticleCard article={a} key={a.id} />
                    })}
                </div>
            ) : titleSearchInput ? (
                <p>
                    Currently, {displayName} hasn't published news articles with '{titleSearchInput}' in the title.
                </p>
            ) : (
                <p>Currently, {displayName} hasn't published any news articles.</p>
            )}
        </>
    )
}
