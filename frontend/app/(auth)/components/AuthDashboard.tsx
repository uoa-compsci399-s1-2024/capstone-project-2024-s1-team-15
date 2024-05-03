"use client"

import React from "react"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"
import { UserScopeLabel } from "@/app/(auth)/components"

export default function AuthDashboard(): React.JSX.Element {
    const { user, token, clearSession } = useAuth()

    return (
        <div>
            {user && (
                <div className={"flex flex-row space-x-4 items-center justify-start leading-none"}>
                    <div>
                        <p>Logged in as <b className={"font-medium"}>{user.displayName}</b></p>
                    </div>
                    { token && <UserScopeLabel scopes={getScopesFromToken(token)}/>}
                    <button className="button" onClick={clearSession}>Logout</button>
                </div>
            )}
        </div>
    )
}
