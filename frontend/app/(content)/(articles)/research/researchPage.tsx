'use client'

import React, {  useEffect, useState } from "react"
import { SCOPES } from "@/app/lib/consts"
import { getResearchPage } from "@/app/services/research"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import Paginator from "@/app/components/Paginator"
import SearchBar from "@/app/components/SearchBar"
import icons from "@/app/lib/icons"
import { IArticle } from "@aapc/types"


export default function AllResearchPage() {
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [research, setResearch] = useState<IArticle[]>([])

    useEffect(() => {
        getResearch(1)
    }, [])

    useEffect(() => {
        getResearch(page)
    }, [page])

    const getResearch = (pg: number) => {
        getResearchPage(pg).then((p)=> {
            setResearch(p.data)
            setLastPage(p.lastPage)
        })}

    return (
        <>
            <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
                <h1 className="page-title">All Research</h1>
                <SearchBar />
            </div>
            <Privileged requiredScopes={SCOPES.maintainer}>
                <ButtonLink theme={"cms"} href={"/research/publish"} text={"Publish Research"} icon={icons.add}/>
            </Privileged>
            <div className={"space-y-12 mt-6"}>
                {research.map((a) => {
                    return <ArticleCard article={a} key={a.id} />
                })}
            </div>
            <Paginator currentPage={page} setCurrentPage={setPage} lastPage={lastPage} />
        </>
    )
}
