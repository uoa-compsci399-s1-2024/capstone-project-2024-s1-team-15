"use client"

import React, { useContext } from "react"
import ButtonLink from "@/app/components/ButtonLink"
import AuthProvider from "@/app/components/AuthProvider"
import AuthContext from "@/app/lib/auth/AuthContext"

export default function AuthLayout({ children }: React.PropsWithChildren) {
    const { user, clearSession } = useContext(AuthContext)

    return (
        <AuthProvider>
            <div>
                {user !== null ? (
                    <>
                        <p>Logged in as {user.displayName}</p>
                        <button className="button" onClick={clearSession}>Logout</button>
                    </>
                ) : (
                    <>
                        <ButtonLink href={"/login-new"} text={"Log In"}/>
                    </>
                )}
                {children}
            </div>
        </AuthProvider>
    )
}
