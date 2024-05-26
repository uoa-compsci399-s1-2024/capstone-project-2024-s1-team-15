"use client"

import React, { useRef } from "react"
import icons from "@/app/lib/icons"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"
import { UserScopeLabel } from "@/app/(auth)/components"
import { LoginModal, ChangePasswordModal } from "@/app/components/modals"
import Button from "@/app/components/Button"
import { ModalRef } from "@/app/lib/hooks/useModal"
import ButtonLink from "@/app/components/ButtonLink";

export default function AuthDashboard({ dashboardLocation }: { dashboardLocation: string }): React.JSX.Element {
    const { user, token, clearSession } = useAuth()
    let scopes = getScopesFromToken(token)
    const loginRef = useRef<ModalRef>(null)
    const changePasswordModalRef = useRef<ModalRef>(null)

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
                    <div className={`flex justify-center gap-x-4`}>
                        <ButtonLink
                            text={"My Account"}
                            icon={icons.user}
                            href={"/my-account"}
                        />
                        <Button
                            text={"Log out"}
                            theme={"secondary"}
                            icon={icons.logout}
                            onClick={clearSession}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center gap-x-4">
                    {/*<Button*/}
                    {/*    text={"Sign up"}*/}
                    {/*    icon={icons.signup}*/}
                    {/*/>*/}
                    <Button
                        text={"Log in"}
                        theme={"secondary"}
                        icon={icons.login}
                        onClick={() => { loginRef.current && loginRef.current.showModal() }}
                    />
                </div>
            )}
            <LoginModal ref={loginRef} modalId={`${dashboardLocation}-login`}/>
            <ChangePasswordModal ref={changePasswordModalRef} modalId={`${dashboardLocation}-change-password`}/>
        </div>
    )
}
