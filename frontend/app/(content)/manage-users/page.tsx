"use client"

import React, { useEffect, useState } from "react"
import { IPaginator, IUser } from "@aapc/types"
import { useAuth } from "@/app/lib/hooks"
import { Nullable } from "@/app/lib/types"
import { getUsers } from "@/app/services/user"
import Paginator from "@/app/components/Paginator"
import SearchBar from "@/app/components/SearchBar"
import ManageUserCard from "@/app/(content)/manage-users/components/ManageUserCard"

export default function ManageUsersPage() {
    const { user, token } = useAuth()
    const [userP, setUserP] = useState<Nullable<IPaginator<IUser>>>(null)
    const [page, setPage] = useState<number>(1)
    const [userSearchTerm, setUserSearchTerm] = useState<string | undefined>(undefined)

    useEffect(() => {
        getUsers(userSearchTerm, { page, perPage: 10 }, { token }).then(r => {
            if (r.success) {
                setUserP(r.result)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSearchTerm, page])

    return (
        <div>
            <h1 className={"page-title"}>Manage Users</h1>
            <div className={"mb-4"}>
                <p className={"form-label"}>Search by username</p>
                <SearchBar onSearchInputChange={i => setUserSearchTerm(i)}/>
            </div>
            {userP && user &&
                <>
                    <Paginator paginator={userP} setPage={setPage}/>
                    <div className={"space-y-4 mt-4"}>
                        {userP.data.map(u =>
                            <ManageUserCard user={u} key={u.username} isSelf={u.username === user.username}/>
                        )}
                    </div>
                </>
            }
        </div>
    )
}
