"use client"
import { ArticleType} from "@aapc/types"
import React, { useState } from "react"
import {deleteNews} from "@/app/services/news"
import { useAuth } from "@/app/lib/hooks"
import { useRouter } from "next/navigation"
import { deleteResearch } from "@/app/services/research"
import icons from "@/app/lib/icons";
import ButtonLink from "@/app/components/ButtonLink"


type DeleteButtonProps = {
    text: string,
    articleType: ArticleType
    articleId: string
}


export default function ExternalLinkButton({text, articleType, articleId} : DeleteButtonProps): React.JSX.Element{

    const { token } = useAuth()
    const router = useRouter()

    const handleClick = async () => {

        console.log(articleType)

        switch(articleType){
            case ArticleType.news: {
                const response = await deleteNews(articleId, {token})
                if(response.status === 204){
                    router.replace("/news")
                }
            }break
            case ArticleType.news_external: {
                const response = await deleteNews(articleId, {token})
                if(response.status === 204){
                    router.replace("/news")
                }
            }break
            case ArticleType.research: {
                const response = await deleteResearch(articleId, {token})
                if(response.status === 204){
                    router.replace("/research")
                }
            }break
            case ArticleType.research_external: {
                const response = await deleteResearch(articleId, {token})
                if(response.status === 204){
                    router.replace("/research")
                }
            }break
            
        }
    }

    return(
        <ButtonLink theme={"red"} onClick={handleClick} href={""} text={"Delete"} icon={icons.trash} />
    )
}

