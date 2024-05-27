import React from "react"
import { getMetadata } from "@/app/lib/util"
import NewsPage from "@/app/(content)/(articles)/news/newsPage"

export const metadata = getMetadata("All News")

export default async function AllNewsPage() {

    return (
        <NewsPage />
    )
}