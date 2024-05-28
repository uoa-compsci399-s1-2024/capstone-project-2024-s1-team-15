"use client"

import React, { useRef } from "react"
import { Article, ArticleType, IArticle } from "@aapc/types"
import Link from "next/link"
import User from "@/app/components/User"
import { FiExternalLink } from "react-icons/fi"
import ConfirmModal from "@/app/components/modals/ConfirmModal"
import { ModalRef } from "@/app/lib/hooks/useModal"
import ButtonLink from "@/app/components/ButtonLink"
import icons from "@/app/lib/icons"

type ArticleCardProps = {
    articleJSON: string,
    disableModal?: boolean
}

export default function ArticleCard({ articleJSON, disableModal = false }: ArticleCardProps): React.JSX.Element {
    const article: IArticle = new Article(JSON.parse(articleJSON))
    const externalConfirmModalRef = useRef<ModalRef>(null)

    if ([ArticleType.news, ArticleType.research].includes(article.articleType)) {
        return (
            <Link
                className={"block w-full"}
                href={`/${article.articleType === ArticleType.news ? "news" : "research"}/${article.id}`}
            >
                <InnerArticleCard article={article}/>
            </Link>
        )
    } else {
        return (
            <>
                <ConfirmModal
                    id={`external-link-${article.id}`}
                    onConfirm={() => window.open(article.content, "_blank")}
                    ref={externalConfirmModalRef}
                    buttonText={"Open in New Tab"}
                    buttonIcon={<FiExternalLink size={"100%"}/>}
                    buttonTheme={"green"}
                    white
                >
                    <div className={"space-y-4"}>
                        <p>This article links to an <b className={"font-medium"}>external site</b>.</p>
                        <Link href={article.content} target={"_blank"} className={"block"}>
                            <div
                                className={"group bg-blue-100 bg-opacity-60 hover:bg-opacity-80 shadow-inner rounded-2xl px-6 py-4 transition"}>
                                <p className={"smallest group-hover:underline"}>{article.content}</p>
                            </div>
                        </Link>
                        <ButtonLink
                            theme={"cms"}
                            href={`/${article.articleType === ArticleType.news_external ? "news" : "research"}/${article.id}/edit`}
                            text={"Edit / Delete External Link"}
                            icon={icons.edit}
                        />
                    </div>
                </ConfirmModal>
                <button
                    className={"block w-full"}
                    onClick={() => {
                        !disableModal && externalConfirmModalRef.current && externalConfirmModalRef.current.showModal()
                    }}
                >
                    <InnerArticleCard article={article}/>
                </button>
            </>
        )
    }
}

function InnerArticleCard({ article }: { article: IArticle }): React.JSX.Element {
    const isExternal = [ArticleType.research_external, ArticleType.news_external].includes(article.articleType)

    return (
        <div className={`block text-black hover:bg-black hover:bg-opacity-5 transition text-left w-full
            px-3 py-2 rounded-lg
            sm:px-4 sm:py-2.5 sm:rounded-xl
            md:px-5 md:py-3 md:rounded-2xl 
        `}>
            <div className={"w-full flex-col flex"}>
                <h5 className={"leading-tight"}>{article.title}</h5>
                {isExternal
                    ? <div className={"flex-row flex gap-x-1 text-gray-400 items-center mt-1"}>
                        <FiExternalLink/>
                        <p className={"font-light tracking-tight text-blue-400 smallest truncate max-w-96"}>
                            {article.content}
                        </p>
                    </div>
                    : article.subtitle !== "" &&
                    <p className={"font-light tracking-tight text-gray-400 italic smaller mt-1"}>
                        {article.subtitle}
                    </p>
                }
                <div className={"mt-2 font-light flex-row flex-wrap flex items-center gap-x-1"}>
                    <User user={article.publisher} size={"small"}/>
                    <div>
                        <p className={"smallest text-gray-500 block"}>
                            {new Date(article.publishedAt).toLocaleDateString("en-us", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
