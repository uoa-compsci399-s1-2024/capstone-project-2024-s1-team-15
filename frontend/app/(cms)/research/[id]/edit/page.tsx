import React from "react";
import Link from "next/link";
import { API_URI } from "@/app/consts";
import { Article } from "@aapc/types";

export async function getMetadata({ params }: { params: { id: number } }) {
    const req = await fetch(API_URI + `/content/news/${params.id}`, { method: "get" })
    if (req.status === 404) {
        return <p>Not Found</p>
    }
    const article = new Article(await req.json())
}

export default function EditResearchPage({ params }: { params: { id: number } }) {
    return (
        <div>
            <h1>Editing Research {params.id}</h1>
            <Link href={`/research/${params.id}`}>Return</Link>
        </div>
    )
}
