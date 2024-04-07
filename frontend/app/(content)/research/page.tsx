import React from "react";
import { Article, Paginator } from "@aapc/types";
import { API_URI } from "@/app/consts";
import ArticleCard from "@/app/components/ArticleCard";
import ButtonLink from "@/app/components/ButtonLink";

export default async function AllResearchPage () {
    const research = new Paginator(Article, await(await fetch(API_URI + "/content/research?pp=1000", { method: "get" })).json())
    const researchCards: React.JSX.Element[] = []
    for (const a of research.data) {
        researchCards.push(<ArticleCard article={a} key={a.id}/>)
    }

    return (
        <div>
            <h1>All Research</h1>
            <div className={"my-8"}><ButtonLink href={"/research/create"} text={"Publish News"}/></div>
            <div className={"space-y-12"}>
                {researchCards}
            </div>
        </div>
    )
}
