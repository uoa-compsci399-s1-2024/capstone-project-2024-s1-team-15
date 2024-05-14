import React from "react"
import { SCOPES } from "@/app/lib/consts"
import { getMetadata } from "@/app/lib/util"
import { getAllResearch } from "@/app/services/research"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard"
import Privileged from "@/app/components/Privileged"
import ButtonLink from "@/app/components/ButtonLink"
import PageTemplate from "@/app/components/PageContentTemplate"
import Pagination from "@/app/components/Paginations"

export const metadata = getMetadata("All Research")

export default async function AllResearchPage() {
    const research = await getAllResearch()

    return (
        <PageTemplate>
            <PageTemplate.PageName><div className="page-title">All Research</div></PageTemplate.PageName>
            <PageTemplate.HighlightSection>
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <ButtonLink href={"/research/publish"} text={"Publish Research"}/>
                </Privileged>
                <div className={"space-y-12 mt-6"}>
                    {research.data.map((a) => {
                        return (
                            <ArticleCard article={a} key={a.id}/>
                        )
                    })}
                </div>
            </PageTemplate.HighlightSection>
            <PageTemplate.RemainingPageContent>
                <Pagination />
            </PageTemplate.RemainingPageContent>
        </PageTemplate>
    )
}
