import ContentEditor from "@/app/components/ContentEditor";
import { ArticleFromCMS } from "@/app/components/ArticleFromCMS";
import { Article, ArticleType, IArticle } from "@aapc/types";
import React, { useState } from "react";
import { API_URI } from "@/app/consts";

export default function ArticleForm ({ articleType, actionType, article }: { articleType: ArticleType, article?: IArticle, actionType: "create" | "edit" }) {
    const [editorContent, setEditorContent] = useState(article?.content ?? "")
    const [title, setTitle] = useState(article?.title ?? "")
    const [subtitle, setSubtitle] = useState(article?.subtitle ?? "")

    const submitArticle = () => {
        const a = {
            title: title,
            subtitle: subtitle,
            content: editorContent,
            media: []
        }
        switch (actionType) {
            case "create": {
                fetch(`${API_URI}/content/${articleType === ArticleType.news? 'news': 'research'}`, {
                    method: "post",
                    body: JSON.stringify(a)
                }).then()
            }
        }
    }

    const updateTitle = () => {
        const e: HTMLTextAreaElement = document.getElementById("title")! as HTMLTextAreaElement
        setTitle(e.value)
    }

    const updateSubtitle = () => {
        const e: HTMLTextAreaElement = document.getElementById("subtitle")! as HTMLTextAreaElement
        setSubtitle(e.value)
    }

    return (
        <>
            <p className={"form-label"}>Title</p>
            <textarea id={"title"}
                      className={"form-input"}
                      onChange={updateTitle}
                      placeholder={"Enter title here... (required)"}
                      defaultValue={article?.title}
            />

            <p className={"form-label"}>Subtitle</p>
            <textarea id={"subtitle"}
                      className={"form-input"}
                      onChange={updateSubtitle}
                      placeholder={"Enter subtitle here... (optional)"}
                      defaultValue={article?.subtitle}
            />

            <p className={"form-label"}>Content</p>
            <ContentEditor setEditorContent={setEditorContent} content={article?.content} />

            <div className={""}>
                <button className={"button mt-8 text-lg"}>Publish {articleType === ArticleType.news? "News" : "Research"}</button>
            </div>

            <p className={"form-label"}>Article Preview</p>
            <div className={"p-6 rounded-2xl border-dotted border-2 border-black border-opacity-30"}>
                <article className={""}>
                    <ArticleFromCMS article={new Article({ title: title, subtitle: subtitle, content: editorContent })}/>
                </article>
            </div>
        </>
    )
}
