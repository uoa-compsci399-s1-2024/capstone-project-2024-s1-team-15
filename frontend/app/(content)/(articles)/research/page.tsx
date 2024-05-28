import React from "react"
import { getMetadata } from "@/app/lib/util"
import DisplayResearchArticles from "@/app/(content)/(articles)/components/DisplayResearchArticles"

export const metadata = getMetadata("All Research")

export default function AllResearchPage() {

    return (
        <>
            <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
                <h1 className="page-title">All Research</h1>
            </div>
            <DisplayResearchArticles />
        </>
    )
}
