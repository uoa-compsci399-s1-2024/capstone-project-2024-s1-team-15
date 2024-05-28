"use client"

import SearchBar from "@/app/components/SearchBar"
import { getAllNews } from "@/app/services/news"
import { Article, ArticleType, IPaginator } from "@aapc/types"
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import { SCOPES } from "@/app/lib/consts"
import icons from "@/app/lib/icons"
import { getAllResearch } from "@/app/services/research"
import ExternalArticleCard from "./ExternalArticleCard"
import React from "react"
import { getNewsPage } from "@/app/services/news"
import { getResearchPage } from "@/app/services/research"
import Paginator from "@/app/components/Paginator"
import { IArticle } from "@aapc/types"

type displayAllArticleProps = {
    articleType: string
}

export default function DisplayAllArticles({articleType} : displayAllArticleProps){
    const [articles, setArticles] = useState<IPaginator<Article> | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [news, setNews] = useState<IArticle[]>([])
    const [research, setResearch] = useState<IArticle[]>([])

    const getNews = (pg: number, searchTerm: string) => {
        getNewsPage(pg, searchTerm).then((p)=> {
            setNews(p.data)
            setLastPage(p.lastPage)
        })}

    const getResearch = (pg: number, searchTerm: string) => {
        getResearchPage(pg).then((p)=> {
            setResearch(p.data)
            setLastPage(p.lastPage)
        })}

    useEffect(() => {
        if (articleType === "news") {
            if (page === 1) {
                getNews(1, searchTerm);
            } else {
                getNews(page, searchTerm);
            }
            getNewsPage(page, searchTerm).then((news) => {
                setArticles(news);
            });
        } else {
            if (page === 1) {
                getResearch(1, searchTerm);
            } else {
                getResearch(page, searchTerm);
            }
            getAllResearch(searchTerm).then((research) => {
                setArticles(research);
            });
        }
    }, [page, articleType, searchTerm]);



    return(
        <>
        <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
            {articleType === "news" && 
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <ButtonLink theme={"cms"} href={"/news/publish"} text={"Publish News"} icon={icons.add}/>
                </Privileged>
            }
            {articleType === "research" && 
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <ButtonLink theme={"cms"} href={"/research/publish"} text={"Publish Research"} icon={icons.add}/>
                </Privileged>
            }
            <SearchBar onSearchInputChange = {setSearchTerm} />
        </div>
        <div className={"space-y-12 mt-6"}>
            {articles?.totalResults?(
                articles.data.map((a) => {
                    if(a.articleType === ArticleType.news  || a.articleType === ArticleType.research ){
                        return <ArticleCard article={a} key={a.id} />
                    }else{
                        return <ExternalArticleCard article={a} key={a.id}/>
                    }
                    
                })
            ) : searchTerm ? (
                <p>
                    There are no {articleType} article with &apos;{searchTerm}&apos; in the title.
                </p>
            ) : (
                <p>
                    There are no {articleType} articles.
                </p>
            )}
            <Paginator currentPage={page} setCurrentPage={setPage} lastPage={lastPage} />
        </div>    
        </>
    )

}