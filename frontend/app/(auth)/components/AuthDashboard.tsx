"use client"

import React from "react"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"
import { UserScopeLabel } from "@/app/(auth)/components"
import { UserScope } from "@aapc/types"
import { Nullable } from "@/app/lib/types"

export default function AuthDashboard(): React.JSX.Element {
    const { user, token, clearSession } = useAuth()
    let scopes: Nullable<UserScope[]> = getScopesFromToken(token)
    if (token && !scopes) {
        clearSession()
    }

    return (
        <div>
            {user && (
                <div className={"flex flex-row space-x-4 items-center justify-start leading-none"}>
                    <div>
                        <p>Logged in as <b className={"font-medium"}>{user.displayName}</b></p>
                    </div>
                    { scopes && <UserScopeLabel scopes={scopes}/>}
                    <button className="button" onClick={clearSession}>Logout</button>
                </div>
            )}
        </div>
    )
}
