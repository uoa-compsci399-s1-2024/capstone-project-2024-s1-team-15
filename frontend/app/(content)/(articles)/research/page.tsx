import React from "react"
import { getMetadata } from "@/app/lib/util"
import DisplayAllArticles from "@/app/(content)/(articles)/components/PaginatedArticles"

export const metadata = getMetadata("All Research")

export default function AllResearchPage() {
    return (
        <>
            <h1 className="page-title">All Research</h1>
            <p className="mb-4 mx-auto w-full sm:mb-6 md:mb-6 md:w-max; max-w-screen-xl prose">Stay informed with AAPC: Access our latest projects, ongoing research, and a curated selection of published studies in the field of pollen.</p>
            <DisplayAllArticles type="research" />
        </>
    )
}
