import React from "react"
import { getMetadata } from "@/app/lib/util"
import Paginator from "@/app/components/Paginator"
import DisplayAllArticles from "@/app/(content)/(articles)/components/DisplayAllArticles"

export const metadata = getMetadata("All Research")

export default function AllResearchPage() {
    return (
        <>
            <h1 className="page-title">All Research</h1>
            <DisplayAllArticles type="research"/>
        </>
    )
}
