import React from "react"
import { SCOPES } from "@/app/lib/consts"
import { getMetadata } from "@/app/lib/util"
import { getAllResearch } from "@/app/services/research"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import Pagination from "@/app/components/Paginations"
import SearchBar from "@/app/components/SearchBar"

export const metadata = getMetadata("All Research")

export default async function AllResearchPage() {
    const research = await getAllResearch()

    return (
        <>
            <div className="max-w-screen-xl mr-auto">
                <div className="items-start justify-between gap-x-4 sm:flex">
                    <h1 className="page-title">All Research</h1>
                    <SearchBar />
                </div>
            </div>
            <Privileged requiredScopes={SCOPES.maintainer}>
                <ButtonLink href={"/research/publish"} text={"Publish Research"} />
            </Privileged>
            <div className={"space-y-12 mt-6"}>
                {research.data.map((a) => {
                    return <ArticleCard article={a} key={a.id} />
                })}
            </div>
            <Pagination />
        </>
    )
}
