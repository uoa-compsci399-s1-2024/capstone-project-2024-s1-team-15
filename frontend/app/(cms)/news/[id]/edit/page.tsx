import React, { useState } from "react";
import Link from "next/link";
import { getMetadata } from "@/app/util";
import { Article } from "@aapc/types";
import { API_URI } from "@/app/consts";

export const metadata = getMetadata("All News")

export default function EditNewsPage({ params }: { params: { id: number } }) {
    const [article, setArticle] = useState<Article>()
    fetch(`${API_URI}/content/news/${params.id}`, { method: "get" }).then(r => {
        r.json().then(r => setArticle(new Article(r)))
    })

    return (
        <div>
            <h1>Editing News {params.id}</h1>
            {/*<ArticleForm articleType={ArticleType.research} article={article}/>*/}
            <p>Not Implemented Yet</p>
        </div>
    )
}
