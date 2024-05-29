import React from "react"
import { notFound } from "next/navigation"
import { getUserByUsername } from "@/app/services/user"
import DisplayIcon from "@/app/components/DisplayIcon"
import PaginatedArticles from "@/app/(content)/(articles)/components/PaginatedArticles"

type PageParams = {
    params: {
        username: string
    }
}

export default async function Profile({ params: { username } }: PageParams) {
    const result = await getUserByUsername(username)
    if (!result.success) notFound()
    const user = result.result

    return (user &&
        <div className={"space-y-12"}>
            <div className={"flex flex-row items-center mt-6 gap-x-8"}>
                <DisplayIcon
                    src={user.iconSrc} displayName={user.displayName} nextSize={512}
                    className={"h-20 w-20 sm:h-28 sm:w-28 md:h-40 md:w-40 shadow-xl"}
                />
                <div>
                    <h1 className={"my-0"}>{user.displayName}</h1>
                    <p className={"text-gray-500"}>@{user.username}</p>
                </div>
            </div>

            <div>
                <h3>News Articles</h3>
                <PaginatedArticles type={"news"} publisher={username} perPage={5} paginatorPos={"top"}/>
            </div>

            <div>
                <h3>Research Articles</h3>
                <PaginatedArticles type={"research"} publisher={username} perPage={5} paginatorPos={"top"}/>
            </div>
        </div>
    )
}
