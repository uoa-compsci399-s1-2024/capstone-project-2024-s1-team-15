"use client"

import React, { useRef } from "react"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"
import { UserScopeLabel } from "@/app/(auth)/components"
import LoginModal, { LoginModalRef } from "@/app/components/modals/LoginModal";

export default function AuthDashboard(): React.JSX.Element {
    const { user, token, clearSession } = useAuth()
    let scopes = getScopesFromToken(token)
    const ref = useRef<LoginModalRef>(null)

    if (token && !scopes) {
        clearSession()
    }

    const showLoginModal = () => {
        if (ref.current) {
            ref.current.showModal()
        }
    }

    return (
        <>
            {user ? (
                <div className={"flex flex-row space-x-4 items-center justify-start leading-none"}>
                    <div>
                        <p>Logged in as <b className={"font-medium"}>{user.displayName}</b></p>
                    </div>
                    { scopes && <UserScopeLabel scopes={scopes}/>}
                    <button className="hoverable login-button bg-primary" onClick={clearSession}>Logout</button>
                </div>
            ) : (
                <div className="flex gap-4">
                    <button className="hoverable login-button bg-primary" onClick={showLoginModal}>
                        Log in
                    </button>
                    <button className="hoverable signup-button">Sign up</button> {/* Temporary */}
                </div>
            )}
            <LoginModal ref={ref}/>
        </>
    )
}
