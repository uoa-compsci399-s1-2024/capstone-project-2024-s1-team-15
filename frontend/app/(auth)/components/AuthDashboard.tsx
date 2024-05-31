"use client"

import React, { useRef } from "react"
import icons from "@/app/lib/icons"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"
import { UserScopeLabel } from "@/app/(auth)/components"
import { LoginModal, ChangePasswordModal } from "@/app/components/modals"
import Button from "@/app/components/Button"
import { ModalRef } from "@/app/lib/hooks/useModal"
import ButtonLink from "@/app/components/ButtonLink"
import LinkUser from "@/app/components/LinkUser"
import Privileged from "@/app/components/Privileged";
import { SCOPES } from "@/app/lib/consts";

type AuthDashboardProps = {
    dashboardLocation: string,
    onRedirect?: () => void
}

export default function AuthDashboard({ dashboardLocation, onRedirect }: AuthDashboardProps ): React.JSX.Element {
    const { user, token, clearSession } = useAuth()
    let scopes = getScopesFromToken(token)
    const loginRef = useRef<ModalRef>(null)
    const changePasswordModalRef = useRef<ModalRef>(null)

    return (
        <div>
            {user ? (
                <div className={`flex items-center justify-start leading-none
                    flex-col md:flex-row gap-x-4 gap-y-2
                `}>
                    <div className={"flex flex-row items-center gap-x-3"}>
                        <LinkUser user={user} size={"large"}/>
                        {scopes && <UserScopeLabel scopes={scopes}/>}
                    </div>
                    <div className={`flex justify-center gap-x-4`}>
                        <Privileged requiredScopes={SCOPES.admin}>
                            <ButtonLink
                                text={"Manage Users"}
                                theme={"cms"}
                                icon={icons.users}
                                href={"/manage-users"}
                                onClick={() => onRedirect && onRedirect()}
                            />
                        </Privileged>
                        <ButtonLink
                            text={"My Account"}
                            icon={icons.user}
                            href={"/my-account"}
                            onClick={() => onRedirect && onRedirect()}
                        />
                        <Button
                            text={"Log out"}
                            theme={"secondary"}
                            icon={icons.logout}
                            onClick={() => {
                                clearSession()
                                onRedirect && onRedirect()
                            }}
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
                        onClick={() => {
                            loginRef.current && loginRef.current.showModal()
                        }}
                    />
                </div>
            )}
            <LoginModal ref={loginRef} modalId={`${dashboardLocation}-login`}/>
            <ChangePasswordModal ref={changePasswordModalRef} modalId={`${dashboardLocation}-change-password`}/>
        </div>
    )
}
