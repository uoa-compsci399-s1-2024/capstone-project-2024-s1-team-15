"use client"

import SearchBar from "@/app/components/SearchBar"
import { getAllNews } from "@/app/services/news"
import { Article, IPaginator } from "@aapc/types"
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import { SCOPES } from "@/app/lib/consts"
import icons from "@/app/lib/icons"
import { getAllResearch } from "@/app/services/research"

type displayAllArticleProps = {
    articleType: "news" | "research"
}

export default function DisplayAllArticles({articleType} : displayAllArticleProps){
    const [articles, setArticles] = useState<IPaginator<Article> | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        if (articleType === "news") {
            getAllNews(searchTerm).then((news) => {
                setArticles(news)
            })
        } else {
            getAllResearch(searchTerm).then((research) => {
                setArticles(research)
            })
        }
    }, [articleType, searchTerm])

    return (
        <>
            <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
                <Privileged requiredScopes={SCOPES.maintainer}>
                    {articleType === "news" &&
                        <ButtonLink theme={"cms"} href={"/news/publish"} text={"Publish News"} icon={icons.add}/>
                    }
                    {articleType === "research" &&
                        <ButtonLink theme={"cms"} href={"/research/publish"} text={"Publish Research"} icon={icons.add}/>
                    }
                </Privileged>
                <SearchBar onSearchInputChange = {setSearchTerm} />
            </div>
            <div className={"space-y-6 mt-6"}>
                {articles?.totalResults?(
                    articles.data.map((a) => {
                        return <ArticleCard articleJSON={JSON.stringify(a)} key={a.id} />
                    })
                ) : searchTerm ? (
                    <p>
                        No {articleType} articles found with &apos;{searchTerm}&apos; in the title.
                    </p>
                ) : (
                    <p>
                        There are no {articleType} articles.
                    </p>
                )}
            </div>
        </>
    )
}
