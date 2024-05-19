"use client"

import React, { useRef } from "react"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"
import { UserScopeLabel } from "@/app/(auth)/components"
import LoginModal, { LoginModalRef } from "@/app/components/modals/LoginModal"
import ChangePasswordModal, { ChangePasswordModalRef } from "@/app/components/modals/ChangePasswordModal"

export default function AuthDashboard(): React.JSX.Element {
    const { user, token, clearSession } = useAuth()
    let scopes = getScopesFromToken(token)
    const ref = useRef<LoginModalRef>(null)
    const changePasswordModalRef = useRef<ChangePasswordModalRef>(null)

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
                    <p>
                        Logged in as <b className={"font-medium"}>{user.displayName}</b>
                    </p>
                    {scopes && <UserScopeLabel scopes={scopes} />}
                    <button
                        className="hoverable login-button bg-primary text-nowrap"
                        onClick={() => changePasswordModalRef.current?.showModal()}>
                        Change Password
                    </button>
                    <button className="hoverable login-button bg-primary" onClick={clearSession}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex">
                    <button className="hoverable login-button bg-primary mr-4" onClick={showLoginModal}>Log in</button>
                    <button className="hoverable signup-button">Sign up</button> {/* Temporary */}
                </div>
            )}
            <LoginModal ref={ref} />
            <ChangePasswordModal ref={changePasswordModalRef} />
        </div>
    )
}
