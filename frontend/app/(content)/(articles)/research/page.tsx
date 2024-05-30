import React from "react"
import { getMetadata } from "@/app/lib/util"
import DisplayAllArticles from "@/app/(content)/(articles)/components/PaginatedArticles"

export const metadata = getMetadata("All Research")

export default function AllResearchPage() {
    return (
        <>
            <h1 className="page-title">All Research</h1>
            <DisplayAllArticles type="research"/>
        </>
    )
}
