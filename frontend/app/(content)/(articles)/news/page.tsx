

import React, { useEffect, useState } from "react"
import { SCOPES } from "@/app/lib/consts"
import { getMetadata } from "@/app/lib/util"
import { getAllNews } from "@/app/services/news"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import Paginator from "@/app/components/Paginator"
import SearchBar from "@/app/components/SearchBar"
import icons from "@/app/lib/icons"
import { Article, IPaginator } from "@aapc/types"
import DisplayAllArticles from "../components/DisplayAllArticles"

export const metadata = getMetadata("All News")

export default async function AllNewsPage() {
    

    return (
        <>
            <div className="max-w-screen-xl mr-auto items-center justify-between gap-x-4 sm:flex">
                <h1 className="page-title">All News</h1>
            </div>
           <DisplayAllArticles articleType="news" />
        </>
    )
}
