import React from "react"
import { getMetadata } from "@/app/lib/util"
import DisplayAllArticles from "@/app/(content)/(articles)/components/DisplayAllArticles"

export const metadata = getMetadata("All News")

export default async function AllNewsPage() {
    return (
        <>
            <h1 className="page-title">All News</h1>
            <DisplayAllArticles type="news"/>
        </>
    )
}
