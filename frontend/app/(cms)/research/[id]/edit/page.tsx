"use client"

import React, { useState } from "react";
import { API_URI } from "@/app/consts";
import { Article, ArticleType } from "@aapc/types";
import ArticleForm from "@/app/components/ArticleForm";

export default function EditResearchPage({ params }: { params: { id: string } }) {
    const [ article, setArticle ] = useState<Article>()
    fetch(`${API_URI}/content/research/${params.id}`, { method: "get" }).then(r => {
        r.json().then(r => setArticle(new Article(r)))
    })

    return (
        <div>
            <h1>Editing Research {params.id}</h1>
            {/*<ArticleForm articleType={ArticleType.research} article={article}/>*/}
            <p>Not Implemented Yet</p>
        </div>
    )
}
