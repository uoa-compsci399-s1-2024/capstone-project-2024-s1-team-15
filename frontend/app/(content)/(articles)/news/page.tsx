import React from "react"
import { getMetadata } from "@/app/lib/util"
import DisplayAllArticles from "@/app/(content)/(articles)/components/PaginatedArticles"

export const metadata = getMetadata("All News")

export default async function AllNewsPage() {
    return (
        <>
            <h1 className="page-title">All News</h1>
            <p className="prose mb-4">Explore media features on AAPC and pollen research.</p>
            <DisplayAllArticles type="news"/>
        </>
    )
}
