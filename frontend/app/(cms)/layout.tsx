"use client"

import React from "react"
import AuthProvider, { useAuth } from "@/app/cms-authentication/AuthContext"

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CMSLayoutWithAuth>{children}</CMSLayoutWithAuth>
        </AuthProvider>
    )
}

function CMSLayoutWithAuth({ children }: { children: React.ReactNode }) {
    const { currentUser, logout } = useAuth()

    return (
        <div>
            {currentUser && (
                <>
                    <p>Logged in as Admin</p>
                    <button className="button" onClick={logout}>
                        Logout
                    </button>
                </>
            )}

            {children}
        </div>
    )
}
