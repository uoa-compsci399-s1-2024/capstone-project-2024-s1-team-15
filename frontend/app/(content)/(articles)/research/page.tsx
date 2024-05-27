import React from "react"
import { getMetadata } from "@/app/lib/util"
import ResearchPage from "@/app/(content)/(articles)/research/researchPage"

export const metadata = getMetadata("All Research")

export default async function AllResearchPage() {

    return (
        <ResearchPage/>
    )
}
