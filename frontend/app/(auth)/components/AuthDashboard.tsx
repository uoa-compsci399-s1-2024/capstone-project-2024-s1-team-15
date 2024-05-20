"use client"

import React, { useRef } from "react"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"
import { UserScopeLabel } from "@/app/(auth)/components"
import { LoginModal, ChangePasswordModal } from "@/app/components/modals"
import { ModalRef } from "@/app/lib/hooks/useModal"

export default function AuthDashboard({ dashboardLocation }: { dashboardLocation: string }): React.JSX.Element {
    const { user, token, clearSession } = useAuth()
    let scopes = getScopesFromToken(token)
    const loginRef = useRef<ModalRef>(null)
    const changePasswordModalRef = useRef<ModalRef>(null)

    if (token && !scopes) {
        clearSession()
    }

    const showLoginModal = () => {
        if (loginRef.current) {
            loginRef.current.showModal()
        }
    }

    const showChangePasswordModal = () => {
        if (changePasswordModalRef.current) {
            changePasswordModalRef.current.showModal()
        }
    }

    return (
        <div>
            {user ? (
                <div className={`flex items-center justify-start leading-none
                    flex-col space-y-4
                    md:flex-row md:space-x-4 md:space-y-0`}>
                    <div className={`flex items-center justify-center
                        flex-col space-y-2
                        md:flex-row md:space-x-4 md:space-y-0
                    `}>
                        <p>
                            Logged in as <b className={"font-medium"}>{user.displayName}</b>
                        </p>
                        {scopes && <UserScopeLabel scopes={scopes}/>}
                    </div>
                    <div className={`space-x-4`}>
                        <button className="hoverable auth-button bg-primary text-nowrap" onClick={showChangePasswordModal}>
                            Change Password
                        </button>
                        <button className="hoverable auth-button bg-primary" onClick={clearSession}>
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <button className="hoverable auth-button bg-primary mr-4" onClick={showLoginModal}>Login</button>
                    <button className="hoverable auth-button bg-gray-200">Sign up</button> {/* Temporary */}
                </div>
            )}
            <LoginModal ref={loginRef} modalId={`${dashboardLocation}-login`}/>
            <ChangePasswordModal ref={changePasswordModalRef} modalId={`${dashboardLocation}-change-password`}/>
        </div>
    )
}
