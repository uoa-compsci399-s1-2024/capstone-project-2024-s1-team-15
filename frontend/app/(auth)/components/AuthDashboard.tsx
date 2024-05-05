"use client"

import React, { useRef } from "react"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"
import { UserScopeLabel } from "@/app/(auth)/components"
import { UserScope } from "@aapc/types"
import { Nullable } from "@/app/lib/types"
import LoginModal, { LoginModalRef } from "@/app/components/modals/LoginModal";

export default function AuthDashboard(): React.JSX.Element {
    const { user, token, clearSession } = useAuth()
    const ref = useRef<LoginModalRef>(null)

    let scopes: Nullable<UserScope[]> = getScopesFromToken(token)
    if (token && !scopes) {
        clearSession()
    }

    const showLoginModal = () => {
        if (ref.current) {
            ref.current.showModal()
        }
    }

    return (
        <div>
            {user ? (
                <div className={"flex flex-row space-x-4 items-center justify-start leading-none"}>
                    <div>
                        <p>Logged in as <b className={"font-medium"}>{user.displayName}</b></p>
                    </div>
                    { scopes && <UserScopeLabel scopes={scopes}/>}
                    <button className="hoverable login-button bg-primary" onClick={clearSession}>Logout</button>
                </div>
            ) : (
                <button className="hoverable login-button bg-primary" onClick={showLoginModal}>Login</button>
            )}
            <LoginModal ref={ref}/>
        </div>
    )
}
