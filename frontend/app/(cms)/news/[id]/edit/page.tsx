"use client"

import React, { useState } from "react";
import { Article } from "@aapc/types";
import { API_URI } from "@/app/consts";

export default function EditNewsPage({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState<Article>()
    fetch(`${API_URI}/content/news/${params.id}`, { method: "get" }).then(r => {
        r.json().then(d => setArticle(new Article(d)))
    })

    return (
        <div>
            <h1>Editing News {params.id}</h1>
            {String(article)}
            {/*<ArticleForm articleType={ArticleType.research} article={article}/>*/}
            <p>Not Implemented Yet</p>
        </div>
    )
}
