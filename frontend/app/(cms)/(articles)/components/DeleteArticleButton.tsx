"use client"

import { Article, ArticleType } from "@aapc/types"
import React, { useRef } from "react"
import { deleteNews } from "@/app/services/news"
import { useAuth } from "@/app/lib/hooks"
import { useRouter } from "next/navigation"
import icons from "@/app/lib/icons"
import Button from "@/app/components/Button"
import ConfirmModal from "@/app/components/modals/ConfirmModal"
import { ModalRef } from "@/app/lib/hooks/useModal"
import { deleteResearch } from "@/app/services/research"
import ArticleCard from "@/app/(content)/(articles)/components/ArticleCard"
import { Nullable } from "@/app/lib/types"

type DeleteButtonProps = {
    articleJSON: string
    onError?: (message: Nullable<string>) => void
}

export default function DeleteArticleButton({ articleJSON, onError } : DeleteButtonProps): React.JSX.Element {
    const { token } = useAuth()
    const router = useRouter()
    const confirmModalRef = useRef<ModalRef>(null)
    const article = new Article(JSON.parse(articleJSON))

    const handleClick = () => {
        switch (article.articleType) {
            case ArticleType.news:
            case ArticleType.news_external: {
                deleteNews(article.id, { token }).then(r => {
                    if (r.success) {
                        onError && onError(null)
                        router.replace("/news")
                    } else {
                        onError && onError(r.message)
                    }
                })
                break
            }
            case ArticleType.research:
            case ArticleType.research_external: {
                deleteResearch(article.id, { token }).then(r => {
                    if (r.success) {
                        router.replace("/research")
                    } else {
                        onError && onError(null)
                        onError && onError(r.message)
                    }
                })
                break
            }
        }
    }

    return (
        <>
            <ConfirmModal
                id={`delete-${article.id}`}
                onConfirm={handleClick}
                ref={confirmModalRef}
                buttonText={"Delete"}
                buttonIcon={icons.trash}
            >
                <p className={"text-white"}>
                    Are you sure you want to delete this {
                        (article.articleType === ArticleType.news || article.articleType === ArticleType.news_external)
                        ? "news"
                        : "research"
                    } article?
                </p>
                <div className={"bg-white rounded-2xl mt-4"}>
                    <ArticleCard disableModal articleJSON={JSON.stringify(article)}/>
                </div>
            </ConfirmModal>
            <Button
                theme={"cms-red"}
                onClick={() => confirmModalRef.current && confirmModalRef.current.showModal()}
                text={"Delete"}
                icon={icons.trash}
            />
        </>
    )
}

