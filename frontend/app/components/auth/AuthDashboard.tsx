"use client"

import React from "react"
import { useAuth } from "@/app/lib/hooks"
import UserScopeLabel from "@/app/components/auth/UserScopeLabel"


export default function AuthDashboard(): React.JSX.Element {
    const { user, clearSession } = useAuth()

    return (
        <div>
            {user && (
                <div className={"flex flex-row space-x-4 items-center justify-start leading-none"}>
                    <p>Logged in as <b className={"font-medium"}>{user.displayName}</b></p>
                    <UserScopeLabel scopes={user.scopes}/>
                    <button className="button" onClick={clearSession}>Logout</button>
                </div>
            )}
        </div>
    )
}
