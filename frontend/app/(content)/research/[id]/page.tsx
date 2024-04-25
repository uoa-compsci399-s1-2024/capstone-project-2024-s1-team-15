import React from "react"
import Link from "next/link"
import { API_URI } from "@/app/consts"
import { Article } from "@aapc/types"

export default async function ResearchPage({ params }: { params: { id: string } }) {
    const req = await fetch(API_URI + `/content/research/${params.id}`, { method: "get" })
    if (req.status === 404) {
        return <p>Not Found</p>
    }
    const article = new Article(await req.json())

    return (
        <div>
            <h1>{article.title}</h1>
            <h2 className={"italic text-xl font-light text-gray-500 mb-8 mt-4"}>{article.subtitle}</h2>
            <p className={"text-lg mb-8"}>{article.content}</p>
            <Link href={`/research/${article.id}/edit`}>Edit</Link>
        </div>
    )
}
