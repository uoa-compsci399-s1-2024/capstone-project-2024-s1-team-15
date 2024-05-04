"use client"

import React from "react"
import ArticleForm from "@/app/(cms)/(articles)/components/ArticleForm"
import { ArticleType } from "@aapc/types"
import ButtonLink from "@/app/components/ButtonLink"

export default function CreateResearchPage() {
    return (
        <div>
            <h1>Publish a Research Article</h1>
            <ButtonLink href={"/research/publish/example"} text={"Demonstration Example"}/>
            <ArticleForm articleType={ArticleType.research} actionType={"publish"}/>
        </div>
    )
}
