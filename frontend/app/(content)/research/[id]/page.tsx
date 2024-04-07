import React from "react";
import Link from "next/link";
import { API_URI } from "@/app/consts";
import { Article } from "@aapc/types";

export default async function ResearchPage({ params }: { params: { id: number } }) {
    const req = await fetch(API_URI + `/content/research/${params.id}`, { method: "get" })
    if (req.status === 404) { return <p>Not Found</p> }
    const article = new Article(await req.json())

    return (
        <div>
            <h1>{article.title}</h1>
            <Link href={`/research/${article.id}/edit`}>Edit</Link>
        </div>
    )
}
