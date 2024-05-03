"use client"

import React, { useEffect } from "react"
import { redirect } from "next/navigation"
import { useAuth } from "@/app/lib/hooks"

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    const { token } = useAuth()

    useEffect(() => {
        if (!token) {
            redirect("/login")
        }
    })

    return <div>{children}</div>
}
