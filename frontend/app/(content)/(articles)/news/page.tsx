import React from "react"
import { getMetadata } from "@/app/lib/util"
import Paginator from "@/app/components/Paginator"
import DisplayAllArticles from "@/app/(content)/(articles)/components/DisplayAllArticles"

export const metadata = getMetadata("All News")

export default async function AllNewsPage() {
    return (
        <>
            <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
                <h1 className="page-title">All News</h1>
            </div>
            <DisplayAllArticles articleType="news"/>
            <Paginator />
        </>
    )
}
