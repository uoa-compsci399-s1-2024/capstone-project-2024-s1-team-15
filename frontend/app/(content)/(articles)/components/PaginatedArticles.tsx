"use client"

import { useEffect, useState } from "react"
import { IArticle, IPaginator } from "@aapc/types"
import { getResearch } from "@/app/services/research"
import { getNews } from "@/app/services/news"
import { DEFAULT_RESULTS_PER_PAGE, SCOPES } from "@/app/lib/consts"
import icons from "@/app/lib/icons"
import SearchBar from "@/app/components/SearchBar"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import Paginator from "@/app/components/Paginator"
import ArticleCard from "./ArticleCard"
import { Nullable } from "@/app/lib/types";

type DisplayArticleProps = {
    type: "news" | "research"
    publisher?: string
    perPage?: number
    paginatorPos?: "top" | "bottom" | "both"
}

export default function PaginatedArticles({ type, publisher, perPage, paginatorPos = "bottom" } : DisplayArticleProps){
    const [articleP, setArticleP] = useState<Nullable<IPaginator<IArticle>>>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (type === "news") {
            getNews(searchTerm, publisher, { page, perPage: perPage || DEFAULT_RESULTS_PER_PAGE }).then(p => {
                setArticleP(p)
            })
        } else {
            getResearch(searchTerm, publisher, { page, perPage: perPage || DEFAULT_RESULTS_PER_PAGE }).then(p => {
                setArticleP(p)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, page])

    return (articleP &&
        <>
            <div className="max-w-screen-xl mr-auto sm:items-center justify-between gap-x-4 gap-y-4 flex flex-col-reverse sm:flex-row">
                {!publisher &&
                    <Privileged requiredScopes={SCOPES.maintainer}>
                        {type === "news" &&
                            <ButtonLink theme={"cms"} href={"/news/publish"} text={"Publish News"} icon={icons.add}/>
                        }
                        {type === "research" &&
                            <ButtonLink theme={"cms"} href={"/research/publish"} text={"Publish Research"}
                                        icon={icons.add}/>
                        }
                    </Privileged>
                }
                <SearchBar onSearchInputChange={s => setSearchTerm(s)} />
            </div>
            <div className={"space-y-6 mt-6"}>
                {(paginatorPos === "top" || paginatorPos === "both") &&
                    <Paginator setPage={setPage} paginator={articleP}/>
                }
                {articleP.totalResults > 0
                    ? articleP.data.map(a =>
                        <ArticleCard articleJSON={JSON.stringify(a)} key={a.id}/>
                    )
                    : searchTerm !== ""
                        ? <p>No {type} articles found with &apos;{searchTerm}&apos; in the title.</p>
                        : <p>There are currently no {type} articles.</p>
                }
                {(paginatorPos === "bottom" || paginatorPos === "both") &&
                    <Paginator setPage={setPage} paginator={articleP}/>
                }
            </div>
        </>
    )
}
