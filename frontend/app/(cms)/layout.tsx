"use client"

import React, { useEffect } from "react"
import { useAuth } from "../(auth)/CMSAuthContext"
import { redirect } from "next/navigation"

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    const { currentUser } = useAuth()

    useEffect(() => {
        if (!currentUser) {
            redirect("/login")
        }
    })

    return <div>{children}</div>
}
